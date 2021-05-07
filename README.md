# vaccineCheckNotifier
This project aims to check availability of Covid vaccine slots in a neighbourhood and notify subscribers via email ([preview](./mail_sample.jpeg)) when it is available. This is a serverless and stateless code aimed to be running on google app script.
| :warning: WARNING          |
|:---------------------------|
| The API fetch call of this code returns 403 error effectively making this project obsolete.|
## Feature Roadmap
This repository is no longer actively maintained and missing features such as unsubscribe will not be implemented. You can check out [this website](https://www.vaccinateme.in/covid/?type=pincode) which effectively solves the same problem.
## Motivation to use Google App script
Initially I planned to use Node JS as backend service for this project which would have worked fine but I would need to host it and maintain a database for it. Google sheets were  enought for me as a database and not having to pay for hosting services for this project sounded appealing so I decided to used it as a backend service.
## Why it doesn't work
Initially I thought API fetch was not working because of incorrect request headers being sent to server and I spent way too much time trying to fix it as exaclty same request was working from postman in my local development environment.
After hours of trial and error I managed to isolate the problem and found that firewall at [cowin website](https://cdn-api.co-vin.in) is blocking all requests which originated outside India and returned [this](./error.html). Since this project was intended to run at google servers and I can't control the location of those servers, there is no obvious way for me to make it work.
## What does work
Many parts of this code work perfectly such as accepting responses from user and sending dynamically generated emails on a time event triggered function. They can be used to learn and get a deeper insignt into Google app script and develop skills. All code in this repo is freely available to everyone and can be used in different pojects.
## Learning outcomes
Making this app was a great learning outcome for me as I not only got to work on a real world problem but had to do it in a small time frame to develop it. This is first time I used debugger fucntion by setting breakpoints and it was life changing for me. But, the most important lesson of all which I learnt was to test core functions of your app early in development stages so that you'll know this solution is actually viable.
## License
This project uses [MIT License](./LICENSE).
