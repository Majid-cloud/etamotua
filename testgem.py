# # Import the Python SDK
# import google.generativeai as genai
# # Used to securely store your API key

# GOOGLE_API_KEY="AIzaSyA-891sizDRYcDrYVIvOy1zcreyhQIyYVM"
# genai.configure(api_key=GOOGLE_API_KEY)
# model = genai.GenerativeModel('gemini-pro')
# response = model.generate_content("Write a story about a magic backpack.")
# print(response.text)


import google.generativeai as genai
# Used to securely store your API key
GOOGLE_API_KEY="AIzaSyA-891sizDRYcDrYVIvOy1zcreyhQIyYVM"
genai.configure(api_key=GOOGLE_API_KEY)
model = genai.GenerativeModel('gemini-pro')

OS_CONTEXT = {
    'debian': 'for Debian 11 ',
    'ubuntu': 'for Ubuntu 22.04 ',
    'centos': 'for CentOS 8 ',
    'rocky': 'for Rocky Linux 8 '
}


def insert_sgemini_prompt(prompt,os_choice):
    print(os_choice)
    os_context = OS_CONTEXT.get(os_choice, 'f')
    debian_context_prompt = prompt + " " + os_context + " in python3 only"
    GOOGLE_API_KEY="AIzaSyCiLxMx-vXR0GV79QRDN_FVO3b_TIrNK7k"
    genai.configure(api_key=GOOGLE_API_KEY)
    model = genai.GenerativeModel('gemini-pro')

    print(debian_context_prompt)
    print("##########", type(debian_context_prompt))
    response = model.generate_content(debian_context_prompt)
    response=response.text
    full_response = f"{response}\n\n"
    
    return full_response

def run_db_query(query):
    query = query + " for mysql in python3 "
    print("###########3qw",type(query))
    GOOGLE_API_KEY="AIzaSyCiLxMx-vXR0GV79QRDN_FVO3b_TIrNK7k"
    genai.configure(api_key=GOOGLE_API_KEY)
    
    model = genai.GenerativeModel('gemini-pro')

    response = model.generate_content(query)
    response=response.text
    print("##########m",query)
    print("##########m",response)

    query_result = f"{response}\n\n"
    
    return query_result
