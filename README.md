# Sauce UI - Automation Test

This is Automated test which was build to test https://www.saucedemo.com/ eCommerce site UI Functionality using cypress as javascript framework.

In this project E2E test were develop in order to automate the Login and Purchase Flow functionality. 

![image](docs/e2eFlow.png)

List of Test Scenarios:  

* Login Functionality
* Add/Remove products from inventory to cart and update cart badge
* Check items added to  shopping cart / remove unwanted items and proceed with checkout
* Complete Checkout


## Getting Started

These instructions will get you a copy of the project up and running on your local machine for testing purposes.

## Installing

#### Clone repo and go to it.

```
git clone https://github.com/XFaramirX/ultraUIautomation
```

#### Install dependencies

```
yarn install
```

## How to run tests:

#### Command interface Only

```
yarn cypress:run
```

####  Generate and View Report History

You can generate the latest report run for the end to end flow from your local host
```
yarn e2e
```
This command will execute create a detail report using Allure reporter inside **/allure-report** folder.
After executing this command the report would open automatically in a new window. 

If you want to run the same test collection and get the history just run yarn e2e again and go to opened report url /allure-report/index.html#graph **Retries trend.** 

#### Run in Docker 
Run below command to pull docker image
```
docker pull cypress/included:8.3.0
```
```
yarn docker:run
```


### GithubActions
You can see the latest run in CI/CD at : https://github.com/XFaramirX/ultraUIautomation/actions/workflows/included.yml 
Currently using actions/checkout@v2 workflow.

## Reporting

Reporting Tools used:

**Allure Report**
https://github.com/Shelex/cypress-allure-plugin


## Author

- **Jose David Barrera - Colombia** 
Linkedin: https://www.linkedin.com/in/david-barrera-bernal-90096447/ 
https://developers.google.com/profile/u/xfaramir 
