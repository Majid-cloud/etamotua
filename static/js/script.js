// static/js/script.js

document.addEventListener('DOMContentLoaded', function() {

    let moduleCount = 0;

    // Initial button to add test cases
    $('#add-test-case-btn').on('click', function() {
        addModule();
        $(this).hide();  // Hide the initial button after the first click
    });

    // Function to dynamically add a new module
    function addModule() {
        moduleCount++;  // Keep track of how many modules have been added

        // HTML template for a new module
        const newModule = `
            <div id="module-${moduleCount}" class="test-module bg-light p-4 rounded shadow-lg mb-4">
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
                <div id="prompt-form-${moduleCount}" class="prompt-form" style="display: none;">
                    <!-- Form content will be injected here based on the selected type -->
                </div>
                <div id="result-${moduleCount}" class="result-section" style="display: none;">
                    <div class="d-flex justify-content-between align-items-center">
                        <h4 class="mb-0">Generated Response</h4>
                        <button class="btn btn-info btn-toggle" type="button" data-toggle="collapse" data-target="#responseContent-${moduleCount}" aria-expanded="false" aria-controls="responseContent-${moduleCount}">
                            <i class="fas fa-chevron-down"></i> View Response
                        </button>
                    </div>
                    <div class="collapse" id="responseContent-${moduleCount}">
                        <div id="response-content-${moduleCount}" class="response-content mt-3">
                            <!-- Response will be loaded here -->
                        </div>
                    </div>
                    <div class="d-flex justify-content-end mt-3">
                        <a id="download-link-${moduleCount}" class="btn btn-success btn-animate" href="#" download>Download Output</a>
                    </div>
                </div>
                <!-- Add new module button -->
                <div class="text-center mt-4">
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

        if (selectedType === 'linux') {
            formHtml = `
                <form id="linux-form-${moduleId}" class="bg-light p-4 rounded shadow-lg" method="POST">
                    <div class="form-group">
                        <label for="linux-prompt-${moduleId}">Enter your Linux command:</label>
                        <input type="text" id="linux-prompt-${moduleId}" name="prompt" class="form-control input-shadow" placeholder="Enter a Linux command..." required>
                    </div>
                    <div class="form-group">
                        <label for="os-${moduleId}">Select your OS:</label>
                        <select id="os-${moduleId}" name="os" class="form-control input-shadow" required>
                            <option value="debian">Debian</option>
                            <option value="ubuntu">Ubuntu</option>
                            <option value="centos">CentOS</option>
                            <option value="rocky">Rocky Linux</option>
                        </select>
                    </div>
                    <button type="submit" class="btn btn-primary btn-animate">Generate Response</button>
                </form>
            `;
        } else if (selectedType === 'db') {
            formHtml = `
                <form id="db-form-${moduleId}" class="bg-light p-4 rounded shadow-lg" method="POST">
                    <div class="form-group">
                        <label for="db-prompt-${moduleId}">Enter your DB query prompt:</label>
                        <input type="text" id="db-prompt-${moduleId}" name="query_prompt" class="form-control input-shadow" placeholder="Enter a DB query prompt..." required>
                    </div>
                    <button type="submit" class="btn btn-primary btn-animate">Generate DB Query</button>
                </form>
            `;
        } else if (selectedType === 'api') {
            formHtml = `
                <form id="api-form-${moduleId}" class="bg-light p-4 rounded shadow-lg" method="POST">
                    <div class="form-group">
                        <label for="api-prompt-${moduleId}">Enter API Test Description:</label>
                        <input type="text" id="api-prompt-${moduleId}" name="api_prompt" class="form-control input-shadow" placeholder="Enter API Test Description..." required>
                    </div>
                    <div class="form-group">
                        <label for="api-endpoint-${moduleId}">Enter API Endpoint:</label>
                        <input type="text" id="api-endpoint-${moduleId}" name="api_endpoint" class="form-control input-shadow" placeholder="https://api.example.com/v1/resource" required>
                    </div>
                    <div class="form-group">
                        <label for="http-method-${moduleId}">Select HTTP Method:</label>
                        <select id="http-method-${moduleId}" name="http_method" class="form-control input-shadow" required>
                            <option value="GET">GET</option>
                            <option value="POST">POST</option>
                            <option value="PUT">PUT</option>
                            <option value="DELETE">DELETE</option>
                        </select>
                    </div>
                    <button type="submit" class="btn btn-primary btn-animate">Generate API Test Script</button>
                </form>
            `;
        }

        // Insert the form into the relevant module
        $(`#prompt-form-${moduleId}`).html(formHtml).show();
    });

    // Add new module button click handler
    $(document).on('click', '.add-another-module', function() {
        addModule();
    });

});
