#!/bin/zsh

# 引数チェック
if [ $# -lt 2 ]; then
  echo "使い方: ./diffbundle.sh <ベースブランチ> <対象ブランチ>"
  exit 1
fi

BASE_BRANCH="$1"
TARGET_BRANCH="$2"

# タイムスタンプ付きの出力ファイル名
TIMESTAMP=$(date +"%Y%m%d%H%M%S")
ZIP_NAME="diff_${TARGET_BRANCH}_${TIMESTAMP}.zip"
FILELIST_NAME="diff_${TARGET_BRANCH}_filelist.txt"

# 差分ファイル一覧を作成
git diff --name-only "$BASE_BRANCH".."$TARGET_BRANCH" > "$FILELIST_NAME"

# ディレクトリ構造を保持して zip 作成
zip -r "$ZIP_NAME" $(cat "$FILELIST_NAME" | sed 's/ /\\ /g')

echo "差分ファイル一覧: $FILELIST_NAME"
echo "差分をまとめたzip: $ZIP_NAME"
