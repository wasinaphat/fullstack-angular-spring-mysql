# fullstack-angular-spring-mysql
# git add . && git commit -m "update code" && git push

#add pagination module
ng add @angular/localize
npm i @ng-bootstrap/ng-bootstrap
frontend
// generate Component
ng generate component sales-person-list
// generate Class
ng generate class sales-person-list/SalesPerson
//create service
ng generate service services/product

npm i bootstrap
npm i @fortawesome/fontawesome-free

add them into angular.json
 "styles": [
              "src/styles.css",
              "node_modules/bootstrap/dist/css/bootstrap.min.css",
              "node_modules/@fortawesome/fontawesome-free/css/all.min.css"
            ],

backend
package dependency
Spring Data JPA
Lombok
MySQL Driver
Rest Repositories