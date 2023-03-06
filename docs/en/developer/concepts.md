# Basic Concepts

## Tick

tick, also known as Pulse, is the smallest unit of time when the player processes data. It cannot be directly converted to time, but it is linearly related to the position of the time axis in a DAW.

## PPQ (Pulses-per-Quarter-Note) / Resolution

PPQ (Pulses-per-Quarter Note) is also known as resolution. Its literal meaning is how many pulses (ticks) make up each quarter note.

The higher the resolution, the finer the dimension you can use to edit the song, usually ranging from 24 to 960.

The default resolution in TuneFlow is `480`.

## Tempo

Tempo is the unit used in a song to specify the speed of a certain section. Different tempos may be used at different points in a song, therefore a tempo is also called a tempo event, which means that when this event occurs, the tempo changes.

The tempo unit in TuneFlow is BPM (Beats-per-Minute). Note that the beats here refer to quarter notes, not the beats defined by the current time signature.

<!-- prettier-ignore-start -->
::: tip
There must be at least one tempo in a song. The first tempo must start from tick 0.
:::
<!-- prettier-ignore-end -->

## Time Signature

Similar to tempo, a song can also contain one or more time signatures. Each time signature consists of a numerator and a denominator, with the denominator indicating the length of each beat and the numerator indicating how many beats are in a bar. Each time signature is also called a time signature event, which means that when this event occurs, the time signature changes.

<!-- prettier-ignore-start -->
::: tip
There must be at least one time signature in a song. The first time signature must start from tick 0.
:::
<!-- prettier-ignore-end -->

Continue reading: [Data Models](./data-models.md) and [How the Plugin System Works](./how-we-run-plugins.md)
