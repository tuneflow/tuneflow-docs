# 插件系统概览

TuneFlow为开发者提供了一个强大且易于实现的插件平台，你可以通过编写插件的方式读取工程信息和调用TuneFlow的底层能力。

有别于VST/AU只针对单轨处理的局限性，TuneFlow的插件系统可以让你从全局出发，开发更具系统性的插件，比如：
- 你可以接入AI模型来为旋律续写或添加多轨道的和声；
- 你可以轻易地生成贴合整首歌曲结构的鼓点；
- 你甚至可以操控每个轨道的VST并且用算法来生成每个参数的自动化。
- ......

插件系统代码库：
[https://github.com/andantei/tuneflow](https://github.com/andantei/tuneflow)

基础插件代码库：
[https://github.com/andantei/tuneflow-plugin-basic](https://github.com/andantei/tuneflow-plugin-basic)