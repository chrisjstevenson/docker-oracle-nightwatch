module.exports = {
    "test_runner": "mocha",
    "src_folders": ["e2e"], // keep this set to e2e
    "output_folder": "reports",
    "selenium": {
        "start_process": true,
        "server_path": "e2e/bin/selenium.jar",
        "port": 4444,
        "cli_args": {
            "webdriver.chrome.driver" : "e2e/bin/chromedriver"
        }
    },
    "test_settings": {
        "default": {
            "launch_url" : "http://localhost:8000",
            "screenshots": {
                "enabled": false,
                "path": ""
            },
            "globals": {
                "waitForConditionTimeout": 10000
            },
            "desiredCapabilities": {
                "browserName": "chrome"
            }
        },
        "docker": {
            "selenium": {
                "start_process": false,
            },
            "selenium_host": "selenium",
            "selenium_port": 4444,
            "launch_url" : "http://app:8000",
            "screenshots": {
                "enabled": false,
                "path": ""
            },
            "globals": {
                "waitForConditionTimeout": 10000
            },
            "desiredCapabilities": {
                "browserName": "chrome"
            }
        },
        "chrome": {
            "desiredCapabilities": {
                "browserName": "chrome",
                "javascriptEnabled": true
            }
        }
    }
};