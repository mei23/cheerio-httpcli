#!/usr/bin/env node

'use strict';

/**
 * 同期リクエストによるGoogle検索サンプル
 *
 * 以下のword変数の内容で検索します
 */
var word = 'チュパカブラ';

var client = require('../index');

// [重要] google検索の場合はfollowMetaRefreshをfalseにする(README.md参照)
client.set('followMetaRefresh', false);

console.log('--- Bingで検索 ---');
var result1 = client.fetchSync('http://www.bing.com/search', { q: word });
if (result1.error) {
  console.error(result1.error);
} else {
  var results1 = [];
  // 検索結果が個別に格納されている要素をループ
  var $ = result1.$;
  $('.b_algo').each(function () {
    // 各検索結果のタイトル部分とURL、概要を取得
    var $h2 = $(this).find('h2');
    var url = $h2.find('a').attr('href');
    if (url) {
      results1.push({
        title: $h2.text(),
        url: url
      });
    }
  });
  console.log(results1);
}

console.log('\n--- Googleで検索 ---');
var result2 = client.fetchSync('http://www.google.co.jp/search', { q: word });
if (result2.error) {
  console.error(result2.error);
} else {
  var results2 = [];
  // 検索結果が個別に格納されている要素をループ
  var _$ = result2.$;
  _$('h3').each(function () {
    // 各検索結果のタイトル部分とURLを取得
    var url = _$(this).closest('a').attr('href');
    if (url) {
      results2.push({
        title: _$(this).text(),
        url: url
      });
    }
  });
  console.log(results2);
}
