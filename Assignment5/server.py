# You don't need to modify this if you don't want to
# Start with: python server.py
# localhost:8000 is the url to access the server

import re
import os
from http.server import BaseHTTPRequestHandler, HTTPServer
import mimetypes

filename = "favs.txt"

class HTTPRequestHandler(BaseHTTPRequestHandler):
    def do_PUT(self):
        print("Received PUT request")
        if re.search('/api/update-favs', self.path):
            length = int(self.headers.get('content-length'))
            data = self.rfile.read(length).decode('utf-8')
            print("Data received:", data)

            # Write the data to the file
            with open(filename, "w") as f:
                f.write(data)

            self.send_response(200)
        else:
            self.send_response(403)
        self.end_headers()

    def do_GET(self):
        print("Received GET request for:", self.path)
        path_without_query = self.path.split('?')[0]
        file_requested = path_without_query.lstrip('/')  # Remove leading slash

        if file_requested == '':
            file_requested = 'index.html'  # Default to index.html if no file is specified

        if os.path.isfile(file_requested):
            self.send_response(200)

            # Guess content type based on file extension
            content_type, _ = mimetypes.guess_type(file_requested)
            if content_type is None:
                content_type = 'application/octet-stream'

            self.send_header('Content-Type', content_type)
            self.end_headers()

            # Open the file in binary mode
            with open(file_requested, 'rb') as f:
                self.wfile.write(f.read())
        else:
            self.send_response(404, 'Not Found: record does not exist')
            self.end_headers()

if __name__ == '__main__':
    print("Starting server...")
    server = HTTPServer(('localhost', 8000), HTTPRequestHandler)
    try:
        print("Server started")
        server.serve_forever()
    except KeyboardInterrupt:
        pass
    server.server_close()
    print("Server stopped")