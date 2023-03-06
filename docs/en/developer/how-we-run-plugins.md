# How Does the Plugin System Work?

Before starting development, it is necessary to understand the workflow of the plugin system.

The majority of editing operations in TuneFlow are performed by plugins. You can think of the plugin system as the execution engine of the editor.

Every time a user triggers a plugin, the DAW notifies the plugin to initialize. When the plugin is running, the DAW takes a snapshot of the current song data and sends it to the execution method of the plugin for processing. This snapshot includes most of the editable data in the entire project, such as the tempo and time signature of the song, the instruments, notes, audio content, automation, and audio plugins of each track.

The execution method of the plugin receives a `Song` instance as the song snapshot. We can access and modify the content of the `Song` instance in the plugin. After the execution method is executed, the DAW reads the `Song` modified by the plugin and applies the changes to the user interface and the playback engine.

When the user performs undo or redo, the plugin no longer participates, and the DAW switches between different snapshots directly.

![Workflow of the Plugin System](./images/pipeline_flow_en.jpg)

Continue Reading [Data Models](./data-models.md) and [Create Your First Plugin](./create-your-first-plugin.md)
