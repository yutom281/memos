# About this app
Personal training

# Setup
1. Install Node.js and npm
2. Install Node dependencies from package.json by running "npm install"
3. Install Python (3.8 or higher)
4. Create Python venv by running "python -m venv your-venv-name"
5. Install Python dependencies on your venv by running "pip install -r requirements.txt"
6. Configure MongoDB Atlas connection settings
	- Copy .env.template, and rename it as .env  
	- Put the SSL/TLS client certificate to your local directory
	- Replace the value of "CERT_X509" in .env with the path of your certificate file

# How to debug
## client
Run "npm run dev"
## server API
Run "cd api; scripts/start_api_server.sh"
