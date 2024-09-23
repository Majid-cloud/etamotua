document.addEventListener('DOMContentLoaded', function() {
    // Handle the form submission for the Linux command generator
    $(document).on('submit', '#prompt-form', function(event) {
        event.preventDefault(); // Prevent default form submission

        var form = $(this);
        $.ajax({
            url: form.attr('action'),
            method: 'POST',
            data: form.serialize(),
            success: function(data) {
                console.log("Command Success:", data); // Debug: Log the response
                if (data.response) {
                    // Update the response content
                    $('#response-content').html('<pre>' + data.response + '</pre>');
                    // Show the response container
                    $('#response-container').show();
                }
                if (data.download_url) {
                    // Update the download link
                    $('.download-link').attr('href', data.download_url).show();
                }
            },
            error: function(xhr, status, error) {
                console.error('Command AJAX Error:', error);
                $('#response-content').html('<p class="text-danger">An error occurred while generating the command.</p>');
                $('#response-container').show();
            }
        });
    });

    // Handle the form submission for the DB query generator
    $(document).on('submit', '#query-form', function(event) {
        event.preventDefault(); // Prevent default form submission

        var form = $(this);
        $.ajax({
            url: form.attr('action'),
            method: 'POST',
            data: form.serialize(),
            success: function(data) {
                console.log("DB Query Success:", data); // Debug: Log the query response
                if (data.db_query) {
                    // Update the query content
                    $('#query-content').html('<pre>' + data.db_query + '</pre>');
                    // Show the query container
                    $('.query-container').show();
                }
                if (data.download_url) {
                    // Update the download link
                    $('.download-query-link').attr('href', data.download_url).show();
                }
                // Show the query form section after submission
                $('#db-query-section').collapse('show');
            },
            error: function(xhr, status, error) {
                console.error('DB Query AJAX Error:', error);
                $('#query-content').html('<p class="text-danger">An error occurred while generating the query.</p>');
                $('.query-container').show();
            }
        });
    });

    // Handle the + Generate DB Query button click to show the form
    $('#generate-query-button').on('click', function() {
        $('#db-query-section').collapse('show'); // Show the DB Query form
        $(this).hide(); // Hide the button
    });
});
