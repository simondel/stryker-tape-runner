"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var log4js = require("log4js");
var events_1 = require("events");
var test_runner_1 = require("stryker-api/test_runner");
var tape = require('tape');
var log = log4js.getLogger('TapeTestRunner');
var TapeTestRunner = (function (_super) {
    __extends(TapeTestRunner, _super);
    function TapeTestRunner(runnerOptions) {
        var _this = _super.call(this) || this;
        _this.files = runnerOptions.files;
        return _this;
    }
    TapeTestRunner.prototype.purgeFiles = function () {
        this.files.forEach(function (f) { return delete require.cache[f.path]; });
    };
    TapeTestRunner.prototype.run = function () {
        var _this = this;
        return new Promise(function (resolve, fail) {
            var testNames = [];
            try {
                _this.purgeFiles();
                tape.createStream({ objectMode: true })
                    .on('data', function (row) {
                    if (row.type === 'assert' && !row.ok) {
                        fail("test failed " + row);
                    }
                })
                    .on('end', function () {
                    resolve({
                        status: test_runner_1.RunStatus.Complete,
                        tests: testNames,
                        errorMessages: []
                    });
                });
                try {
                    _this.files.filter(function (file) { return file.included; }).forEach(function (testFile) {
                        testNames.push(testFile.path);
                        require(testFile.path);
                    });
                }
                catch (error) {
                    resolve({
                        status: test_runner_1.RunStatus.Error,
                        tests: [],
                        errorMessages: [error]
                    });
                }
            }
            catch (error) {
                log.error(error);
                resolve({
                    status: test_runner_1.RunStatus.Error,
                    tests: [],
                    errorMessages: [error]
                });
            }
        });
    };
    return TapeTestRunner;
}(events_1.EventEmitter));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TapeTestRunner;
//# sourceMappingURL=TapeTestRunner.js.map