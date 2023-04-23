# Python 插件开发

了解了 Python 插件的运行原理，现在让我们真正上手开发吧。

## 定义参数

在 [Python 插件入门](./getting-started-python.md) 中我们提到你需要在 `def params(song)` 静态方法中定义你需要的参数列表。本小节会详细介绍如何定义这些参数。

我们以下面的例子来讲解：

```python
class YourPlugin(TuneflowPlugin):
    ...

    @staticmethod
    def params(song: Song) -> dict[str, ParamDescriptor]
        return {
            "clipAudioData": {
                "displayName": {
                    "zh": '音频',
                    "en": 'Audio',
                },
                "defaultValue": None,
                "widget": {
                    "type": WidgetType.NoWidget.value,
                },
                "hidden": True,
                "injectFrom": {
                    "type": InjectSource.ClipAudioData.value,
                    "options": {
                        "clips": "selectedAudioClips",
                        "convert": {
                            "toFormat": "ogg",
                            "options": {
                                "sampleRate": 44100
                            }
                        }
                    }
                }
            },
            "style": {
                "displayName": {
                    "zh": '风格',
                    "en": 'Style',
                },
                "defaultValue": None,
                "widget": {
                    "type": WidgetType.SelectList.value,
                    "config": {
                        "options": [
                          {
                              "value": "electronic",
                              "label": {
                                  "zh": "电子",
                                  "en": "Electronic"
                              }
                          },
                          {
                              "value": "funk",
                              "label": {
                                  "zh": "放克 Funk",
                                  "en": "Funk"
                              }
                          },
                        ],
                    },
                },
                "adjustableWhenPluginIsApplied": True,
            },
            "barCount": {
                "displayName": {
                    "zh": '小节长度',
                    "en": 'Bar counts',
                },
                "defaultValue": 2,
                "widget": {
                    "type": WidgetType.InputNumber.value,
                    "config": {
                        "step": 1,
                        "minValue": 1
                    },
                },
            }
        }

    ...
```

可以看到 `def params(song: Song)` 方法实际上只需要返回一个参数名到参数配置信息([ParamDescriptor](https://github.com/tuneflow/tuneflow-py/blob/main/src/tuneflow_py/descriptors/param.py#L80))的 dict。这其中每一个参数名都会从用户或 DAW 中获得实际的取值，并最终提供给 `def run(song: Song, params: dict[str, Any])` 方法中的 `params` 参数。

`ParamDescriptor` 中几个主要值的含义如下

- **displayName** 这个参数在 DAW 的 UI 中显示的名称，你可以直接提供一个字符串，或者提供一个 [LabelText](https://github.com/tuneflow/tuneflow-py/blob/main/src/tuneflow_py/descriptors/text.py#L3)。
- **defaultValue** 该参数的初始值
- **widget** 该参数在 UI 中用于收集用户输入的 UI 控件
- **optional** 该参数的输入值是否可以为空
- **injectFrom** 如果通过 DAW 来提供该参数的值，则在此配置 DAW 注入该参数的方式

你也可以浏览 [param.py](https://github.com/tuneflow/tuneflow-py/blob/main/src/tuneflow_py/descriptors/param.py) 源代码以了解更多取值的含义。

### 参数注入 (Injection)

注意到上面的示例当中有一个参数提供了 `injectFrom` 的值。这就是 TuneFlow 插件系统中的**参数注入**。我们的参数输入来源于两个渠道，一个是用户输入，这部分参数我们需要为它们提供 `widget` 值，以便提供 UI 让用户进行交互；另一种则是直接来源于 DAW，这部分的参数在插件运行时由 DAW 直接注入到参数结果中，因此称为参数注入。

我们可以通过 `injectFrom` 中的配置信息来指导 DAW 如何注入这个参数的值，具体配置信息可以参考[injectFrom](https://github.com/tuneflow/tuneflow-py/blob/main/src/tuneflow_py/descriptors/param.py#L118)。

### 隐藏参数

如果你需要一个参数但不想让用户看见它，你可以把这个参数设为隐藏参数。比如你有一个由 DAW 注入的参数，它并不需要用户参与，这个时候我们可以把它的 `hidden` 值设为 true。

### 音频参数

在上面的例子中有一个特别的注入参数 `clipAudioData`，它的注入类型是 `InjectFrom.ClipAudioData`。当我们需要读取客户端中的实际音频数据时，就需要提供这一类的音频参数。 TuneFlow 的数据交换格式为了高效地传输而只保留大块数据的引用，比如对于音频片段，TuneFlow 的工程数据中只保存音频文件的地址。这样如果我们直接从 `song` 中是无法获取客户端的实际音频数据的。

而有了音频参数，我们便可以让 DAW 在运行插件时把我们需要的片段的实际音频数据也一并注入进来。你还可以再 `InjectFrom` 的配置中添加 [convert](https://github.com/tuneflow/tuneflow-py/blob/main/src/tuneflow_py/descriptors/param.py#L22) 选项，这样可以让 TuneFlow 在发送之前先将原始音频裁剪和压缩，以减小网络传输数据量。

## 读取参数

当用户点击运行插件后，插件需求的参数值便会由 DAW 从用户输入和内部状态中统一收集，并提供到插件 `def run(song: Song, params: dict[str, Any])` 方法中的 `params` 中，并且 `params` 中的 key 与 你定义的 `def params(song: Song)` 方法返回值中提供的 key 一一对应。要读取一个具体的参数值，只需访问 `params[keyName]` 即可。

```python
class YourPlugin(TuneflowPlugin):
    ...

    @staticmethod
    def params(song: Song) -> dict[str, ParamDescriptor]
        return {
            "myParam": {
                ...
            },
        }

    @staticmethod
    def run(song: Song, params: dict[str, Any]):
        myParam = params["myParam"]
        ...

    ...
```

## 修改 `song`

[前面](./getting-started-python.md)提到，插件的唯一目的就是按自己的需求修改歌曲，开发者只需要按需求修改 `song`，TuneFlow 会自动应用你的改动。

在修改 `song` 时，你会常常用到 `tick` 这个时间单位，它是播放器进行数据处理时的最小时间单位。你可以通过 [song.tick_to_seconds](https://github.com/tuneflow/tuneflow-py/blob/main/src/tuneflow_py/models/song.py#L422) 和 [song.seconds_to_tick](https://github.com/tuneflow/tuneflow-py/blob/main/src/tuneflow_py/models/song.py#L445) 来进行 tick 和时间的转换。

你可能还会用到其他的基础知识，可以重新温习其他的[基本概念](./concepts.md)。

## 处理异常

如果你的插件在执行过程中遇到了异常，你不需要，也不应该用`try`去捕获并隐藏它。正确的做法是直接让它抛出，插件系统才可以捕获这个异常并让用户了解这个情况。捕获异常后，你的插件的状态条将变为红色，并且 TuneFlow 会弹出一条消息，让用户知道本次执行失败了。

## 示例插件

样例永远是最快的学习途径，你可以通过我们已有的众多开源插件 [tuneflow-py-demos](https://github.com/tuneflow/tuneflow-py-demos) 来学习如何开发和部署你的插件。它们大多只有不到 200 行的核心插件代码。

## 调试插件

在开发过程中，我们需要大量的调试来定位和解决问题。我们为开发者准备了[tuneflow-devkit-py](https://github.com/tuneflow/tuneflow-devkit-py)，用于在本地和 TuneFlow 桌面版进行联调，以及在开发完成后在服务器上部署你的插件。继续阅读 [在本地运行和调试你的插件](./devkit-python.md) 和 [部署你的插件](./deploy-plugin-python.md)。
