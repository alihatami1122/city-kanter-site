<?php
/**
 * Sitemap Generator with Images and Logging
 * Author: ChatGPT
 * Date: 2025-09-22
 */

// مسیر ریشه سایت
$root = __DIR__;

// مسیر فایل خروجی Sitemap
$sitemapFile = $root . '/sitemap.xml';

// مسیر فایل لاگ
$logFile = $root . '/sitemap_log.txt';

// پایه URL سایت
$baseUrl = "http://contersity.ir";

/**
 * تابع بازگشتی برای پیدا کردن تمام صفحات HTML
 */
function getHtmlFiles($dir) {
    $files = [];
    $items = scandir($dir);
    foreach ($items as $item) {
        if ($item == '.' || $item == '..') continue;
        $path = $dir . '/' . $item;
        if (is_dir($path)) {
            $files = array_merge($files, getHtmlFiles($path));
        } elseif (pathinfo($path, PATHINFO_EXTENSION) == 'html') {
            $files[] = $path;
        }
    }
    return $files;
}

/**
 * تابع استخراج تصاویر <img> از یک فایل HTML
 */
function getImages($file) {
    $content = file_get_contents($file);
    preg_match_all('/<img[^>]+src=["\']?([^"\'>]+)["\']?/i', $content, $matches);
    return $matches[1];
}

// شروع XML
$xml = '<?xml version="1.0" encoding="UTF-8"?>' . "\n";
$xml .= '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">' . "\n";

// گرفتن تمام فایل‌های HTML
$htmlFiles = getHtmlFiles($root);
$totalPages = count($htmlFiles);

foreach ($htmlFiles as $file) {
    // مسیر نسبی فایل نسبت به ریشه
    $relativePath = str_replace($root, '', $file);
    $relativePath = str_replace('\\', '/', $relativePath); // ویندوز
    $url = $baseUrl . $relativePath;

    // تاریخ آخرین تغییر فایل
    $lastmod = date('Y-m-d', filemtime($file));

    $xml .= "  <url>\n";
    $xml .= "    <loc>$url</loc>\n";
    $xml .= "    <lastmod>$lastmod</lastmod>\n";
    $xml .= "    <changefreq>weekly</changefreq>\n";
    $xml .= "    <priority>0.8</priority>\n";

    // اضافه کردن تصاویر
    $images = getImages($file);
    foreach ($images as $img) {
        if (!preg_match('/^https?:\/\//', $img)) {
            $img = $baseUrl . '/' . ltrim($img, '/');
        }
        $xml .= "    <image:image>\n";
        $xml .= "      <image:loc>$img</image:loc>\n";
        $xml .= "    </image:image>\n";
    }

    $xml .= "  </url>\n";
}

$xml .= '</urlset>';

// نوشتن در فایل sitemap.xml
file_put_contents($sitemapFile, $xml);

// ثبت لاگ
$logEntry = "[" . date('Y-m-d H:i:s') . "] Sitemap generated successfully. Pages: $totalPages\n";
file_put_contents($logFile, $logEntry, FILE_APPEND);

echo "Sitemap with images generated successfully at $sitemapFile\n";
echo "Total pages: $totalPages\n";
echo "Log written to $logFile\n";
?>
