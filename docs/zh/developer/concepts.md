
# 基本概念

## `tick`

`tick`也叫做 Pulse 是播放器进行数据处理时的最小时间单位。它本身并不能直接与时间进行转换，但它与 DAW 中的时间轴的位置是线性相关的。

## 分辨率 PPQ

PPQ(Pulses-per-Quater Note)通常也叫做 Resolution。它的字面意思是每一个四分音符由多少个脉冲(Pulse)，也就是`tick`所组成。

越高的分辨率代表你可以在越精细的维度上对歌曲进行编辑，通常取值在 24 至 960 之间。

TuneFlow 的默认分辨率为`480`。

## 节奏 Tempo

一首歌曲中用来指定某一部分的快慢的单位就是节奏(Tempo)。一首歌曲里面可能在不同的时间点采用不同的节奏，因此每个节奏也称为节奏事件(Tempo Event)，即当该事件发生的时候节奏便发生了改变。

TuneFlow 中的节奏单位是 BPM(Beats-per-Minute)，即每分钟的拍数。注意：这里的拍(Beats)指的是四分音符，而不是当前拍号所定义的拍。

<!-- prettier-ignore-start -->
::: tip
一首歌曲中必须有至少一个节奏。第一个节奏必须从tick 0开始。
:::
<!-- prettier-ignore-end -->

## 拍号 Time Signature

与节奏相似，一首歌曲也可以包含一个或多个拍号。每个拍号都由分子和分母组成，分母表示每一拍的长度，分子表示一小节有多少拍。每个拍号也称为拍号事件，即当该事件发生的时候拍号便发生了改变。

<!-- prettier-ignore-start -->
::: tip
一首歌曲中必须有至少一个拍号。第一个拍号必须从tick 0开始。
:::
<!-- prettier-ignore-end -->

继续阅读：[数据模型](./data-models.md)以及[插件系统如何运转](./how-we-run-plugins.md)