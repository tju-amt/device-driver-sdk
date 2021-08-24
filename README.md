# device-driver-sdk
A common driver framework to define a EEG device

设备侧要求

* 忙状态位 / 命令报文增加一个逻辑连接标志,因为用了，尽量避免串线 弄个一字节随机数？
* 有个会话刷新机制，自定义一个逻辑连接标志，为了做超时空闲