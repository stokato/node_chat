<?php
/**
 * This file is part of the Elephant.io package
 *
 * For the full copyright and license information, please view the LICENSE file
 * that was distributed with this source code.
 *
 * @copyright Wisembly
 * @license   http://www.opensource.org/licenses/MIT-License MIT License
 */
use ElephantIO\Client;
use ElephantIO\Engine\SocketIO\Version2X;
require __DIR__ . './vendor/autoload.php';
$client = new Client(new Version2X('http://localhost:3000', [
    'headers' => [
        'X-My-Header: websocket rocks',
        'Authorization: Bearer 12b3c4d5e6f7g8h9i'
    ]
]));
$client->initialize();

$msg = array(
    'chat_vid' => '3333',
    'vid_from' => '3333',
    'vid_to' => '0000',
    'message_text' => 'Текст сообщения',
    'type' => 'message',
    'params' => array('a' => [1, 2, 3], 'b' => 'b', 'c' => 3),
//    'auth_key' => $auth_key
);

$client->emit('php_broadcast', $msg);
$client->close();

print_r($msg);