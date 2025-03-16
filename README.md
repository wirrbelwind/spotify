How to run?

1. Sign in https://developer.spotify.com/
2. Go to https://developer.spotify.com/dashboard
3. Create app instance:

Field "Redirect URIs" = http://localhost:3000/api/auth/callback

Field "API used" - choose Web Playback SDK AND Web API

4. After app instance is created, copy its API keys:
   - Client ID
   - Client secret

In root folder of project find a file ".env.example" and rename it to ".env".

Paste in this file your API keys (instead "qwerty").

 5. In terminal run commands:

    npm i
    
    npm run dev
    
