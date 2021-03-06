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
            //acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i,
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
        })
        .bind('fileuploadcompleted', function (e, data) { 
          $('td.name a').editable();
          if (data.result.files.length > 0){
            $('.fileupload-header').show();
          }
        })
        ;


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
          // Editable must be intialzied after refresh.
          $('td.name a').editable();
          // Show widget header if files are available.
          if (result.files.length > 0){
            $('.fileupload-header').show();
          }
        });

});
