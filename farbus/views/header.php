<?php
require 'functions/functions.php';
 ?>
<!DOCTYPE HTML>
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<meta charset="UTF-8">
		<meta name="description" content="Производсто, дистрибуция и монтаж на пердета, щори, комарници,PVC и АЛ дограма">
		<meta name="keywords" content="пердета, щори, комарници, PVC, АЛ, дограма, корнизи">
		<meta name="author" content="Martin Marinov">
		<link rel="stylesheet" href='styles/styles.css'/>
		<script type="text/javascript" src="javascript/jquery-1.11.0.min.js"></script>
		<script type="text/javascript" src="javascript/script.js"></script>
		<title><?=$pageTitle ?></title>
	</head>
	<body>
		<div id="container">
        <header>
            <img src="imgs/farbus-logo.png" alt="farbus_logo" class="logo" />
            <hgroup>
                <h1><?=$h1 ?></h1>
                <div class="sub-info">
                    <h3 id="farbus_phone">
                        <img src="imgs/phone_icon.png" class="phone-icon" alt="phone_icon" />0895065360
                    </h3>
                    <h3>info@farbus.bg</h3>
                </div>
                <h2><?=$h2 ?></h2>
            </hgroup>
            <nav>
                <ul class="menu">
                    <li class="selected"><a href="index.php">Начало</a></li>
                    <li>
                        <a href="">Продукти</a>
                        <ul class="sub-menu">
                            <li>
                                <a href="">Щори</a>
                                <ul class="sub-sub-menu">
                                    <li><a href="">Хоризонтални</a></li>
                                    <li><a href="">Вертикални</a></li>
                                    <li><a href="">Руло</a></li>
                                </ul>
                            </li>
                            <li><a href="sennici.php">Сенници</a></li>
                            <li><a href="">Корнизи</a></li>
                            <li><a href="">Комарници</a></li>
                        </ul>
                    </li>
                    <li>
                        <a href="">Услуги</a>
                        <ul class="sub-menu">
                            <li><a href="">Снемане на Размер</a></li>
                            <li><a href="">Монтаж</a></li>
                            <li><a href="">Консултация</a></li>
                        </ul>
                    </li>
                    <li>
                        <a href="for-us.php">За Нас</a>
                    </li>
                    <li>
                        <a href="">Контакти</a>
                    </li>
                    <li>
                        <a href="">Цени</a>
                        <ul class="sub-menu">
                            <li><a href="">Цени Продукти</a></li>
                            <li><a href="">Цени Услуги</a></li>
                            <li><a href="">Промоции</a></li>
                        </ul>
                    </li>
                </ul>
            </nav>
        </header>
        
        <section class="image-slider">
            <img src="imgs/roller1.JPG" alt="image1" />
            <img src="imgs/roller2.jpg" alt="image2" />
            <img src="imgs/roller3.jpg" alt="image3" />
            <img src="imgs/roller4.jpg" alt="image4" />
        </section>