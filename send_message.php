<?php
header('Content-Type: application/json; charset=utf-8');

// ======= دریافت و پاک‌سازی داده‌ها =======
$name = htmlspecialchars(trim($_POST['name'] ?? ''), ENT_QUOTES, 'UTF-8');
$email = htmlspecialchars(trim($_POST['email'] ?? ''), ENT_QUOTES, 'UTF-8');
$message = htmlspecialchars(trim($_POST['message'] ?? ''), ENT_QUOTES, 'UTF-8');

// ======= اعتبارسنجی =======
if (!$name || !$email || !$message) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "لطفاً همه فیلدها را پر کنید."]);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "ایمیل وارد شده معتبر نیست."]);
    exit;
}

// محدودیت طول
if (strlen($name) > 100 || strlen($email) > 100 || strlen($message) > 1000) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "ورودی‌ها طول مجاز را دارند."]);
    exit;
}

// ======= ساخت پیام نهایی =======
$finalMessage = "📩 پیام جدید از سایت:\n👤 نام: $name\n📧 ایمیل: $email\n📝 پیام: $message";

// ======= اطلاعات API =======
$apiUrl = "https://eitaayar.ir/admin/api";
$token = "199050:fbe60b5a-8245-4128-a7ba-6b553048d831";

// ======= داده‌ها برای ارسال =======
$data = [
    "token" => $token,
    "name" => $name,
    "email" => $email,
    "message" => $finalMessage
];

// ======= ارسال با CURL =======
$ch = curl_init($apiUrl);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
curl_setopt($ch, CURLOPT_TIMEOUT, 10); // حداکثر زمان انتظار
$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

if($response === false){
    $err = curl_error($ch);
    curl_close($ch);
    echo json_encode(["status" => "error", "message" => "❌ خطا در ارسال پیام: $err"]);
    exit;
}

curl_close($ch);

// ======= پاسخ =======
if ($httpCode >= 200 && $httpCode < 300) {
    echo json_encode(["status" => "success", "message" => "✅ پیام با موفقیت ارسال شد."]);
} else {
    echo json_encode(["status" => "error", "message" => "❌ خطا در ارسال پیام. کد پاسخ: $httpCode"]);
}
?>
