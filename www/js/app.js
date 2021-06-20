// This is a JavaScript file
// [NCMB] APIキー設定
var appKey    = "4bf47416a4deb54e6b0aa996ecdea60fbf1371817b99fb5234d2602b99a147c9";
var clientKey = "5b62c1ce281cf1636bc8d6569dc01b268b55128c614569551a0abdcfcc10f461";

// [NCMB] SDKの初期化
var ncmb = new NCMB(appKey, clientKey);
function login(){
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  ncmb.User.loginWithMailAddress(email, password).then(function(user) {
    /* 処理成功 */
    console.log("【ID / PW 認証】ログインに成功しました");
    // [NCMB] ログイン中の会員情報の取得
    currentLoginUser = ncmb.User.getCurrentUser();
    var obj = { email: email, password: password};
    sessionStorage.setItem("key", JSON.stringify(obj));
    window.location.href = "map.html";
    })
    .catch(function(error) {
        /* 処理失敗 */
        console.log("【ID / PW 認証】ログインに失敗しました: " + error);
        alert("【ID / PW 認証】ログインに失敗しました: " + error);
        // フィールドを空に
        email="";
        password="";
        // loading の表示終了
        //$.mobile.loading('hide');
    });
}
