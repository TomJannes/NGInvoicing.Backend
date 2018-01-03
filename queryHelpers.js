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