# Python Plugin Development Guide

Now that you understand the principles of how Python plugins work, let's get started with the actual plugin development.

## Defining parameters

In [Python Plugin Development 101](./getting-started-python.md), we mentioned that you need to define the list of parameters you require in the `def params(song)` static method. This section will provide a detailed explanation of how to define these parameters.

The example below will be used for illustration:

```python
class YourPlugin(TuneflowPlugin):
    ...

    @staticmethod
    def params(song: Song) -> dict[str, ParamDescriptor]
        return {
            "clipAudioData": {
                "displayName": 'Audio',
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
                "displayName": 'Style',
                "defaultValue": None,
                "widget": {
                    "type": WidgetType.SelectList.value,
                    "config": {
                        "options": [
                          {
                              "value": "electronic",
                              "label": "Electronic"
                          },
                          {
                              "value": "funk",
                              "label": "Funk"
                          },
                        ],
                    },
                },
                "adjustableWhenPluginIsApplied": True,
            },
            "barCount": {
                "displayName": 'Bar counts',
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

You can see that the `def params(song: Song)` method actually just returns a dict that maps parameter names to their config ([ParamDescriptor](https://github.com/tuneflow/tuneflow-py/blob/main/src/tuneflow_py/descriptors/param.py#L80)). Each of these parameter will receive the actual value from the user or the DAW, and will eventually be provided to `params` in the `def run(song: Song, params: dict[str, Any])` method.

Below are the explanations of the main fields in `ParamDescriptor`:

- **displayName** The display name of this parameter in the DAW's UI. You can simply provide a string, or provide a [LabelText](https://github.com/tuneflow/tuneflow-py/blob/main/src/tuneflow_py/descriptors/text.py#L3)
- **defaultValue** The default value of this param.
- **widget** The UI widget used to collect user input in the DAW's UI.
- **optional** Whether the input of this param can be empty.
- **injectFrom** If injected by the DAW, how this param will be injected.

You can also check out [param.py](https://github.com/tuneflow/tuneflow-py/blob/main/src/tuneflow_py/descriptors/param.py) for more explanations of the fields.

### Parameter injection

Notice in the example above that one of the parameters specified `injectFrom`. This is called **parameter injection** in TuneFlow. The param values come from two ways: either from user input, for which we need to provide a `widget` config to render UI to collect user inputs; the other is to get the value directly from the DAW, for which we specify the `injectFrom` config and instructs the DAW on how to get the param value. For details on parameter injection configuration, please check out [injectFrom](https://github.com/tuneflow/tuneflow-py/blob/main/src/tuneflow_py/descriptors/param.py#L118).

### Hidden parameters

If you need a parameter but don't want the user to see it, you can set the parameter as a hidden parameter. For example, if you have a parameter injected by the DAW that does not require user interaction, you can set its `hidden` value to `true`.

### Audio parameters

In the example above, there is a special injected parameter called `clipAudioData`, with an injection type of `InjectFrom.ClipAudioData`. This kind of parameter is called audio parameters.

Why do we need them? TuneFlow's data exchange format only retains references to large blocks of data for efficient transmission. For example, for audio clips, TuneFlow's project data only saves the address of the audio file. Therefore, we cannot directly obtain the actual audio data from `song`. When we need to read the actual audio data from the client, we need to provide this type of audio parameter.

With audio parameters, we can ask the DAW to inject the actual audio data of the clips we need when running the plugin. You can also add a [convert](https://github.com/tuneflow/tuneflow-py/blob/main/src/tuneflow_py/descriptors/param.py#L22) option to let TuneFlow trim and compress the audio data before sending it to your server.

## Read your parameters

When the user starts to run the plugin, the parameter values requested by the plugin will be collected by the DAW from both user input and internal states, and then provided to `params` in the plugin's `def run(song: Song, params: dict[str, Any])` method. The keys in the `params` dict correspond one-to-one with the keys provided in the return value of the `def params(song: Song)` method you defined. To read a specific parameter value, simply access `params[keyName]`.

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

## Modify `song`

[Earlier](./getting-started-python.md) we mentioned that the only goal of a plugin is to modify the song to its need, and the DAW will take care of the modified song and apply changes accordingly.

When modifying a `song`, you will often use the `tick` time unit, which is the smallest time unit used by the playback engine for data processing. You can use `song.tick_to_seconds` and `song.seconds_to_tick` to convert between ticks and time.

In case you will need to be familiar with other basic concepts, refer to [Basic Concepts](./concepts.md) for more information.

## Handle exceptions

If you encountered exception, don't hide it behind a `try`, simply let it throw and the plugin system will catch it and handle accordingly: the plugin status bar will turn red and a message will pop out to let the user know that this execution has failed.

## Example plugins

Samples are always the fastest way to learn, and you can learn how to develop and deploy your plugins through the many open-source plugins we already have in [tuneflow-py-demos](https://github.com/tuneflow/tuneflow-py-demos). Most of them have less than 200 lines of core plugin code.

## Debug your plugin

During development, a lot of debugging is needed to locate and solve problems. We have prepared [tuneflow-devkit-py](https://github.com/tuneflow/tuneflow-devkit-py) for developers to debug and deploy their plugins locally and in the TuneFlow desktop version, as well as to deploy their plugins on servers after development. Please continue reading [Run and Debug Your Plugin Locally](./devkit-python.md) and [Deploy Your Plugins](./deploy-plugin-python.md).
