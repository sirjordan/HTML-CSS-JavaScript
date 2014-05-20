<?php
function printTextFromFile($filePath) {
	$content = file_get_contents($filePath);
	$content = nl2br($content, true);
	echo $content;
}


?>
