<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // フォームからのデータを取得
    $name = $_POST["name"];
    $email = $_POST["email"];
    $message = $_POST["message"];

    // メールの送信
    $to = "yuraabe0927@gmail.com"; // 送信先のメールアドレスを指定
    $subject = "お問い合わせフォームからのメッセージ";
    $headers = "From: $email";

    // メールの本文
    $mail_body = "お名前: $name\n\nメールアドレス: $email\n\nお問い合わせ内容:\n$message";

    // メールの送信
    mail($to, $subject, $mail_body, $headers);

    // 送信後のリダイレクトなど、適切な処理を行う
    header("Location: thank_you.html");
    exit();
}
?>
