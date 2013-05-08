/*
 * jQuery File Upload Plugin JS Example 7.0
 * https://github.com/blueimp/jQuery-File-Upload
 *
 * Copyright 2010, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 */

/*jslint nomen: true, unparam: true, regexp: true */
/*global $, window, document */

$(function () {
    'use strict';

    var url = $('#fileupload').prop('action')
    // Initialize the jQuery File Upload widget:
    $('#fileupload').fileupload({
        // Uncomment the following to send cross-domain cookies:
        //xhrFields: {withCredentials: true},
 autoUpload: true, 
 sequentialUploads: true, 
 url: url, 
    });

    // Enable iframe cross-domain access via redirect option:
    $('#fileupload').fileupload(
        'option',
        'redirect',
        window.location.href.replace(
            /\/[^\/]*$/,
            '/cors/result.html?%s'
        )
    );

        // Demo settings:
        $('#fileupload').fileupload('option', {
            url: url,
            autoUpload: true, 
            sequentialUploads: true, 
            maxFileSize: 20000000, // 20MB
            acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i,
            process: [
                {
                    action: 'load',
                    fileTypes: /^image\/(gif|jpeg|png)$/,
                    maxFileSize: 20000000 // 20MB
                },
                {
                    action: 'resize',
                    maxWidth: 1440,
                    maxHeight: 900
                },
                {
                    action: 'save'
                }
            ]
        });

        // Add event handler for renaming files.
        $('#fileupload').bind('fileuploadcompleted', function (e, data) {
           $('.template-download .rename').each( function(){
             
               // Setup editable for field
               $(this).parents('tr.template-download').find('td.name a').editable({
               event: 'click',
               callback: function(data){
               if(data.content){

               var title = data.content;
               var url = data.$el.data('url'); 
               $.ajax({
                   xhrFields: {withCredentials: true},
                   url: url,
                   dataType: 'json',
                   type: 'POST',
                   data:{'title':title}, 
               });
               data.$el.effect('blink');
               }
               }});
           });
        })

        // Upload server status check for browsers with CORS support:
        // Load existing files:
        $.ajax({
            xhrFields: {withCredentials: true},
            url: $('#fileupload').fileupload('option', 'url'),
            dataType: 'json',
            context: $('#fileupload')[0]
        }).done(function (result) {
            $(this).fileupload('option', 'done')
                .call(this, null, {result: result});
        });

});
