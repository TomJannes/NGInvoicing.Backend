'use strict';

const fs = require('fs');
const pdf = require('dynamic-html-pdf');
const Handlebars = require('handlebars');
var Invoice = require('../model/invoice');
var Profile = require('./../../profile/model/profile');

exports.generateInvoice = function (req, res, next) {
    var id = req.params.invoiceId;
    Invoice.findById(id).exec()
        .then(function(invoice) {
            return Profile.find().exec()
                .then(function(profile) {
                    return [invoice, profile];
                });
        })
        .then(function (result) {
            if (result[0] === null || result[1] === null) {
                return res.status(404);
            }
            else {
                var template = fs.readFileSync(__dirname + '/../templates/invoice-template.html', 'utf8');
                var options = {
                    format: 'A4',
                    orientation: 'portrait',
                    border: '10mm'
                };
                var document = {
                    type: 'buffer',
                    template: template,
                    context: {
                        data: {
                            invoice: result[0],
                            profile: result[1][0]
                        }
                    }
                };
                pdf.create(document, options)
                    .then((result) => {
                        res.setHeader('Content-Disposition', 'attachment; filename="' + document.context.data.invoice.number + '.pdf"');
                        res.setHeader('Content-type', 'application/pdf');
                        return res.send(result);
                    });
            }
        }).catch(function (err) {
            return next(err);
        });
};

Handlebars.registerHelper('short', function (date) {
    return date.getDate() + '/' + (date.getMonth() + parseInt(1)) + '/' + date.getFullYear();
});

Handlebars.registerHelper('decimals', function (data) {
    return data.toFixed(2);
});
