document.addEventListener('DOMContentLoaded', function() {

    let moduleCount = 0;

    // Initial button to add test cases
    $('#add-test-case-btn').on('click', function() {
        addModule();
        $(this).hide();  // Hide the initial button after the first click
    });

    // Function to dynamically add a new module
    function addModule() {
        moduleCount++;

        // HTML template for a new module
        const newModule = `
            <div id="module-${moduleCount}" class="test-module bg-light p-4 rounded shadow-lg mb-5">
                <h3>Select Test Case Type</h3>
                <div class="form-group">
                    <label for="test-type-${moduleCount}">Choose a test case type:</label>
                    <select id="test-type-${moduleCount}" class="form-control test-type-dropdown" data-module="${moduleCount}">
                        <option value="">Select...</option>
                        <option value="linux">Generate Linux Test Case</option>
                        <option value="db">Generate DB Test Case</option>
                        <option value="api">Generate API Test Case</option>
                    </select>
                </div>
                <div id="prompt-form-${moduleCount}" class="prompt-form mt-4 mb-5" style="display: none;">
                    <!-- Form content will be injected here based on the selected type -->
                </div>
                <div id="result-${moduleCount}" class="result-section mt-5 mb-5" style="display: none;">
                    <div class="d-flex justify-content-between align-items-center">
                        <h4 class="mb-0">Generated Response</h4>
                        <button class="btn btn-info btn-toggle" type="button" data-toggle="collapse" data-target="#responseContent-${moduleCount}" aria-expanded="false" aria-controls="responseContent-${moduleCount}">
                            <i class="fas fa-chevron-down"></i> View Response
                        </button>
                    </div>
                    <div class="collapse mt-3" id="responseContent-${moduleCount}">
                        <div id="response-content-${moduleCount}" class="response-content mt-3 p-3 border rounded bg-white position-relative">
                            <!-- Response will be loaded here -->
                            <i class="fas fa-copy copy-icon-${moduleCount}" title="Copy to clipboard" style="position: absolute; top: 10px; right: 10px; cursor: pointer;"></i>
                        </div>
                    </div>
                    <div class="d-flex justify-content-end mt-3">
                        <a id="download-link-${moduleCount}" class="btn btn-success btn-animate" href="#" download>Download Output</a>
                    </div>
                </div>
                <!-- Add new module button -->
                <div class="text-center mt-5">
                    <button class="btn btn-secondary btn-lg add-another-module">
                        <i class="fas fa-plus"></i> Add Another Test Case
                    </button>
                </div>
            </div>
        `;

        // Append the new module to the test-case container
        $('#test-case-container').append(newModule);
    }

    // Handle when a user selects the test case type (Linux, DB, API)
    $(document).on('change', '.test-type-dropdown', function() {
        const moduleId = $(this).data('module');
        const selectedType = $(this).val();

        let formHtml = '';

        // Form for generating a Linux test case
        if (selectedType === 'linux') {
            formHtml = `
                <form id="linux-form-${moduleId}" action="/generate" method="POST" class="bg-light p-4 rounded shadow-lg mt-3">
                    <div class="form-group">
                        <label for="linux-prompt-${moduleId}">Enter your Linux command:</label>
                        <input type="text" id="linux-prompt-${moduleId}" name="prompt" class="form-control input-shadow" placeholder="Enter a Linux command..." required>
                    </div>
                    <div class="form-group mt-4">
                        <label for="os-${moduleId}">Select your OS:</label>
                        <select id="os-${moduleId}" name="os" class="form-control input-shadow" required>
                            <option value="debian">Debian</option>
                            <option value="ubuntu">Ubuntu</option>
                            <option value="centos">CentOS</option>
                            <option value="rocky">Rocky Linux</option>
                        </select>
                    </div>
                    <button type="submit" class="btn btn-primary btn-animate mt-4">Generate Response</button>
                    <div id="loading-spinner-${moduleId}" class="spinner-border text-primary" role="status" style="display:none;">
                        <span class="sr-only">Loading...</span>
                    </div>
                </form>
            `;

        // Form for generating a DB test case
        } else if (selectedType === 'db') {
            formHtml = `
                <form id="db-form-${moduleId}" action="/generate_query" method="POST" class="bg-light p-4 rounded shadow-lg mt-3">
                    <div class="form-group">
                        <label for="db-prompt-${moduleId}">Enter your DB query prompt:</label>
                        <input type="text" id="db-prompt-${moduleId}" name="query_prompt" class="form-control input-shadow" placeholder="Enter a DB query prompt..." required>
                    </div>
                    <button type="submit" class="btn btn-primary btn-animate mt-4">Generate DB Query</button>
                    <div id="loading-spinner-${moduleId}" class="spinner-border text-primary" role="status" style="display:none;">
                        <span class="sr-only">Loading...</span>
                    </div>
                </form>
            `;

        // Form for generating an API test case
        } else if (selectedType === 'api') {
            formHtml = `
                <form id="api-form-${moduleId}" action="/generate_api" method="POST" class="bg-light p-4 rounded shadow-lg mt-3">
                    <div class="form-group">
                        <label for="api-prompt-${moduleId}">Enter API Test Description:</label>
                        <input type="text" id="api-prompt-${moduleId}" name="api_prompt" class="form-control input-shadow" placeholder="Enter API Test Description..." required>
                    </div>
                    <div class="form-group mt-4">
                        <label for="api-endpoint-${moduleId}">Enter API Endpoint:</label>
                        <input type="text" id="api-endpoint-${moduleId}" name="api_endpoint" class="form-control input-shadow" placeholder="https://api.example.com/v1/resource" required>
                    </div>
                    <div class="form-group mt-4">
                        <label for="http-method-${moduleId}">Select HTTP Method:</label>
                        <select id="http-method-${moduleId}" name="http_method" class="form-control input-shadow" required>
                            <option value="GET">GET</option>
                            <option value="POST">POST</option>
                            <option value="PUT">PUT</option>
                            <option value="DELETE">DELETE</option>
                        </select>
                    </div>
                    <button type="submit" class="btn btn-primary btn-animate mt-4">Generate API Test Script</button>
                    <div id="loading-spinner-${moduleId}" class="spinner-border text-primary" role="status" style="display:none;">
                        <span class="sr-only">Loading...</span>
                    </div>
                </form>
            `;
        }

        // Insert the form into the relevant module
        $(`#prompt-form-${moduleId}`).html(formHtml).show();
    });

    // Handle form submission via AJAX with loading spinner
    $(document).on('submit', 'form', function(event) {
        event.preventDefault();  // Prevent the form from reloading the page
        
        const form = $(this);
        const moduleId = form.closest('.test-module').attr('id').split('-')[1];  // Extract module ID

        // Show the spinner and hide the button
        form.find('button[type="submit"]').hide();
        form.find(`#loading-spinner-${moduleId}`).show();
        
        $.ajax({
            url: form.attr('action'),
            method: 'POST',
            data: form.serialize(),
            success: function(data) {
                // Hide the spinner
                form.find(`#loading-spinner-${moduleId}`).hide();
                
                // Show the Generate Response button again
                form.find('button[type="submit"]').show();

                // Update the response content
                $(`#response-content-${moduleId}`).html('<pre>' + data.response + '</pre>' + 
                    `<i class="fas fa-copy copy-icon-${moduleId}" title="Copy to clipboard" style="position: absolute; top: 10px; right: 10px; cursor: pointer;"></i>`);
                $(`#result-${moduleId}`).show();  // Show the result section
                
                // Update the download link with the URL
                $(`#download-link-${moduleId}`).attr('href', data.download_url).show();
            },
            error: function(xhr, status, error) {
                console.error('Error:', error);
                // Hide the spinner and show the button in case of error
                form.find(`#loading-spinner-${moduleId}`).hide();
                form.find('button[type="submit"]').show();
            }
        });
    });

    // Handle copy to clipboard
    $(document).on('click', '.fas.fa-copy', function() {
        const moduleId = $(this).closest('.test-module').attr('id').split('-')[1];
        const content = $(`#response-content-${moduleId} pre`).text();
        
        navigator.clipboard.writeText(content).then(function() {
            alert('Copied to clipboard!');
        }, function() {
            alert('Failed to copy.');
        });
    });

    // Add new module button click handler
    $(document).on('click', '.add-another-module', function() {
        addModule();
    });

});
