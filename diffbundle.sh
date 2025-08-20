#!/bin/zsh
# 使い方: ./diffbundle.sh <ベースブランチ> <比較ブランチ>

base_branch=$1
target_branch=$2

# 日付取得
date_str=$(date +%Y%m%d)

# ZIP名と一覧名
zip_name="diff_${target_branch}_${date_str}.zip"
list_name="diff_${target_branch}_${date_str}.txt"

# 差分ファイル一覧作成
git diff --name-only $base_branch $target_branch > "$list_name"
echo "✅ 差分ファイル一覧を $list_name に出力しました！"

# ZIP作成
zip -r "$zip_name" $(cat "$list_name")
echo "✅ 差分ファイルを $zip_name にまとめました！"

