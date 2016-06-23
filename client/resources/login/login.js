'use strict';

require('../../browser/javascript/mui/mui');
require('../../browser/javascript/mui/mui.init');
require('../../browser/javascript/mui/mui.ajax');
require('../../browser/javascript/mui/mui.event');
require('../../browser/javascript/mui/mui.detect');
require('../../browser/javascript/mui/mui.target');
require('../../browser/javascript/mui/mui.gestures');
require('../../browser/javascript/mui/mui.namespace');
require('../../browser/javascript/mui/mui.gestures.tap');
require('../../browser/javascript/mui/mui.dialog.toast');

let app = new Vue({
    el: '#app',
    ready(){
        $.init();
    },
    data(){
        return {
            info: {
                account: '',
                password: ''
            }
        }
    },
    methods: {
        $submit: function () {
            $.ajax('/addUserInfo', {
                data: this.info,
                dataType: 'json',
                type: 'post',
                timeout: 10000,
                success: function (res) {
                    if (res.code == 200) {
                        $.ajax('/getUserInfo', {
                            data: {
                                pageSize: 5,
                                pageIndex: 4
                            },
                            dataType: 'json',
                            type: 'post',
                            timeout: 10000,
                            success: function (res) {
                                console.log(res);
                            }
                        })
                    } else {
                        $.toast(res.msg);
                    }
                }
            })
        }
    }
});
