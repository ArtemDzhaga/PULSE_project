<?php 

$name = $_POST['name'];
$phone = $_POST['phone'];
$email = $_POST['email'];

/* $name = htmlspecialchars($name);
$phone = htmlspecialchars($phone);
$email = htmlspecialchars($email); */

require_once('phpmailer/PHPMailerAutoload.php');
$mail = new PHPMailer;
$mail->CharSet = 'utf-8';

// $mail->SMTPDebug = 3;                               // Enable verbose debug output

$mail->isSMTP();                                      // Set mailer to use SMTP
$mail->Host = 'smtp.gmail.com';  // Specify main and backup SMTP servers
$mail->SMTPAuth = true;                               // Enable SMTP authentication
$mail->Username = 'art.dzhaga@gmail.com';                 // Наш логин
$mail->Password = 'emptyfhntv066Art.D';                           // Наш пароль от ящика
$mail->SMTPSecure = 'ssl';                            // Enable TLS encryption, `ssl` also accepted
$mail->Port = 465;                                    // TCP port to connect to
 
$mail->setFrom('art.dzhaga@gmail.com', 'Pulse');   // От кого письмо 
$mail->addAddress('gepoh31811@omibrown.com');     // Add a recipient
//$mail->addAddress('ellen@example.com');               // Name is optional
//$mail->addReplyTo('info@example.com', 'Information');
//$mail->addCC('cc@example.com');
//$mail->addBCC('bcc@example.com');
//$mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
//$mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name
$mail->isHTML(true);                             // Set email format to HTML

/* mail("dzhagaartem@gmail.com", "Заявка с сайта", <br> "Пользователь оставил данные", 
<br> "Имя:".$name."" <br> "E-mail: ".$email"" <br> ,"From: example@mail.ru \r\n");

if (mail("dzhagaartem@gmail.com", "Заявка с сайта", <br> "Пользователь оставил данные", 
<br> "Имя:".$name."" <br> "E-mail: ".$email"" <br> ,"From: example@mail.ru \r\n"))
 {
    echo "Спасибо за вашу заявку!" <br> "Наш менеджер свяжется с вами в ближайшее время!";
} else {
    echo "При отправке сообщения возникли ошибки";
} */

$mail->Subject = 'Данные';
$mail->Body    = '
		Пользователь оставил данные <br> 
	Имя: ' . $name . ' <br> 
	Номер телефона: ' . $phone . '<br>
	E-mail: ' . $email . '';
//точки означают склейку в верстке письма
if(!$mail->send()) {
    return false;
} else {
    return true;
}

?>