"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.DataComponent = void 0;
var core_1 = require("@angular/core");
var Highcharts = require("highcharts/highstock");
var indicators_1 = require("highcharts/indicators/indicators");
var zigzag_1 = require("highcharts/indicators/zigzag");
indicators_1["default"](Highcharts);
zigzag_1["default"](Highcharts);
var DataComponent = /** @class */ (function () {
    function DataComponent(serve, router) {
        this.serve = serve;
        this.router = router;
        this.decide = false;
        this.append = [];
        this.testingCharts = [];
        this.prevSortedBy = null;
        this.asc = true;
        this.testArray = [];
        this.Highcharts = Highcharts;
    }
    DataComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.serve.getStateWiseData().subscribe(function (data) {
            _this.title = data;
            _this.comeOn();
        });
        this.serve.getTestData()
            .subscribe(function (data) {
            _this.testedState = data;
            console.log(_this.testedState);
            //  this.justDoIt();
            _this.sortByTests('abcd');
        });
    };
    DataComponent.prototype.sortBy = function (value) {
        if (this.prevSortedBy === value) {
            this.asc = !this.asc;
        }
        else {
            this.asc = true;
        }
        this.prevSortedBy = value;
        this.sortByField(value);
    };
    DataComponent.prototype.sortByField = function (value) {
        var nameA;
        var nameB;
        if (this.asc) {
            this.title.statewise.sort(function (a, b) {
                if (value == 'state') {
                    nameA = a[value].toLowerCase();
                    nameB = b[value].toLowerCase();
                }
                else {
                    nameA = +a[value];
                    nameB = +b[value];
                }
                if (nameA < nameB)
                    return -1;
                if (nameA > nameB)
                    return 1;
                return 0;
            });
        }
        else {
            this.title.statewise.sort(function (a, b) {
                if (value == 'state') {
                    nameA = a[value].toLowerCase();
                    nameB = b[value].toLowerCase();
                }
                else {
                    nameA = +a[value];
                    nameB = +b[value];
                }
                if (nameA < nameB)
                    return 1;
                if (nameA > nameB)
                    return -1;
                return 0;
            });
        }
    };
    DataComponent.prototype.sortByTests = function (value) {
        value = Object.entries(this.testedState).sort(function (a, b) {
            var nameA = a[1].total.tested;
            var nameB = b[1].total.tested;
            if (nameA > nameB) {
                return -1;
            }
            if (nameA < nameB) {
                return 1;
            }
            return 0;
        }).reduce(function (acc, _a) {
            var k = _a[0], v = _a[1];
            return (acc[k] = v, acc);
        }, {});
        // value=value.reduce((acc, [k, v]) => (acc[k] = v, acc), {});
        console.log(this.testedState, value);
    };
    DataComponent.prototype.comeOn = function () {
        this.temp1 = this.title.statewise;
        this.totalTesting = this.title.tested;
        this.testedTotal = this.totalTesting[this.totalTesting.length - 1];
        // this.title.cases_time_series.forEach(element => {
        //      if (new Date(element.date)>=new Date('13 March'))
        //         this.append.push(+element.dailyconfirmed)
        // });
        // this.title.tested.forEach(element => {
        //   //  if(+element.samplereportedtoday>0)
        //      this.testingCharts.push(+element.samplereportedtoday)
        // });
    };
    DataComponent.prototype.expandMe = function (data) {
        this.router.navigate(['state', data]);
    };
    DataComponent = __decorate([
        core_1.Component({
            selector: 'app-data',
            templateUrl: './data.component.html',
            styleUrls: ['./data.component.css']
        })
    ], DataComponent);
    return DataComponent;
}());
exports.DataComponent = DataComponent;
