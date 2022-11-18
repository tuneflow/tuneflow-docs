# 插件系统概览

TuneFlow为开发者提供了一个强大且易于实现的插件平台，你可以通过编写插件的方式读取工程信息和调用TuneFlow的底层能力。

有别于VST/AU只针对单轨处理的局限性，TuneFlow的插件系统可以让你从全局出发，开发更具系统性的插件，比如：
- 接入AI模型来为旋律续写或添加多轨道的和声；
- 生成贴合整首歌曲结构的鼓点；
- 你甚至可以操控每个轨道的VST并且用算法来生成每个参数的自动化。

插件系统的本体是[tuneflow](https://github.com/andantei/tuneflow)模块，它运行在各个平台的TuneFlow中作为编辑器的驱动引擎。我们已经开源了大部分用于支持基础编辑功能的插件，代码位于[tuneflow-plugin-basic](https://github.com/andantei/tuneflow-plugin-basic)仓库中。另外我们还为TuneFlow插件开发准备了专门的开发工具: [TuneFlow DevKit](https://github.com/andantei/tuneflow-devkit)，它可以与TuneFlow桌面版建立连接，让你在本地开发和调试自定义插件。

接下来让我们开始学习如何开发TuneFlow插件吧：

[基本概念](./concepts.md)

[插件系统是如何运行的](./how-we-run-plugins.md)

[TuneFlow 数据模型](./data-models.md)

[开发你的第一个插件](./create-your-first-plugin.md)