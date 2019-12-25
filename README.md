# 我的餐廳清單

運用node.js、express.js和mongodb打造屬於自己的餐廳清單

## 下載專案

   ```
   git clone https://github.com/austin72905/restaurant-crud.git
   ```
## 安裝npm

  ```
  npm install
  ```

## 安裝套件(npm install )
1. body-parser
2. express
3. express-handlebars
4. method-override
5. mongoose
6. express-session
7. passport
8. passport-local
9. passport-facebook
10. dotenv

## 註冊facebook應用程式

  ```
  https://developers.facebook.com/
  1. 建立應用程式編號
  2. 選擇整合facebook登入
  3. facebook登入 -> 設定 -> 有效的 OAuth 重新導向 URI -> 輸入http://localhost:3000/auth/facebook/callback
  4. 設定 -> 基本資料 -> 記下應用程式編號、密鑰
  ```

## 在專案目錄新增.env

  ```
  FACEBOOK_ID= 應用程式編號
  FACEBOOK_SECRET= 密鑰
  FACEBOOK_CALLBACK= http://localhost:3000/auth/facebook/callback
  ```

## 將種子資料載入mongodb
1. 進入models/seeds，以終端機開啟restaurantSeeder.js
  
  ```
  node restaurantSeeder.js
  ```
  

## 在終端機輸入指令開啟網頁
1. 回到restaurant_crud，以終端機開啟app.js

  ```
  node app.js
  ```

## 在瀏覽器中輸入網址 http://localhost:3000

## 測試帳戶

| Name  | Email             | Password |
| :---: | :---------------: |:--------:|
| 李大明| lidamin@mail | 12345 |


## 功能
1. 能於搜尋欄透過關鍵字找到餐廳
2. 點擊餐廳能取得詳細資料，如地址、電話
3. 能夠依評分排序餐廳
4. 能夠依喜好新增自己的餐廳
5. 能夠註冊帳戶，擁有自己的專屬餐廳名單
 

## 特色
1. 使用mongodb儲存資料
2. app與route分開管理，方便維護
3. 載入method-override 使用路由更府合RESTFUL風格
4. 使用passport localStrategy 讓使用者擁有自己的餐廳名單
5. 使用passport facebookStrategy，能夠使用第三方登入
6. 使用brcypt 密碼雜湊，讓使用者密碼不外洩


# 專案維護者

Austin Lin
