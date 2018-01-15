'use strict';

exports.handleSorting = function(query, params) {
    var sortingFieldParam = params['sorting.field'];
    var sortingCriteriaParam = params['sorting.order'];
    if(sortingFieldParam !== undefined && sortingCriteriaParam !== undefined) {
        query = query.sort(sortingCriteriaParam === 'asc' ? sortingFieldParam : `-${sortingFieldParam}`);
    }
    return query;
}

exports.handlePaging = function(query, params) {
    var currentPageParam = params['pagination.currentPage'];
    var itemsPerPageParam = params['pagination.itemsPerPage'];
    if (currentPageParam !== undefined && itemsPerPageParam !== undefined) {
        var currentPage = parseInt(currentPageParam) - 1;
        var itemsPerPage = parseInt(itemsPerPageParam);
        query = query.skip(currentPage * itemsPerPage).limit(itemsPerPage)
    }
    return query;
}

exports.find = function(req, res, next, model, searchParams) {
    var countQuery = model.count(searchParams);
    var query = model.find(searchParams);

    query = this.handleSorting(query, req.query);
    query = this.handlePaging(query, req.query);

    var items;
    var count;

    query.exec().then(function (result) {
        items = result;
        return countQuery.exec();
    }).then(function (count) {
        res.setHeader('x-total-count', count)
        return res.json(items);
    }).catch(function (err) {
        return next(err);
    });
}