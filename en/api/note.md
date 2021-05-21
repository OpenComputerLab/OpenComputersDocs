# Note API

The Note API provides functionality to convert music notes into their
respective MIDI code and/or their frequency in Hertz, among other
things. It it used in combination with computer.beep and note blocks
(using OpenComponents).

- `note.midi(n: number or string): number`

      Converts a note in string form (e.g. A#4 or Gb3, see below) or a
      given frequency into the respective MIDI code

- `note.freq(n: number or string): number`

      Converts a note in string form (e.g. A#4) or a given MIDI code into
      the respective frequency

- `note.name(n: number): string`

      Converts a MIDI value back into a string; if you have a frequency to
      convert, just use `note.name(note.midi(frequency))`

- `note.ticks(n: number): number`

      Converts note block ticks (0-24) into MIDI code (34-58,
      respectively) and vice-versa. Useful for use with Note Blocks and
      OpenComponents

- `note.play(tone: string or number,duration: number)`

      Plays a note from a string or MIDI code via computer.beep with the
      specified duration

###Available notes The available string names, their respective MIDI
code and their frequency are shown here:

  Name       MIDI code   Frequency      A0         21   27.5000                      
  ---------- ----------- ----------- -- ---------- ---- --------- -- ---------- ---- ---------
  A#0/Bb0   22          29.1352        B0         23   30.8677      C1         24   32.7032
  C#1/Db1   25          34.6478        D1         26   36.7081      D#1/Eb1   27   38.8909
  E1         28          41.2034        F1         29   43.6535      F#1/Gb1   30   46.2493
  G1         31          48.9994        G#1/Ab1   32   51.9131      A1         33   55.0000
  A#1/Bb1   34          58.2705        B1         35   61.7354      C2         36   65.4064
  C#2/Db2   37          69.2957        D2         38   73.4162      D#2/Eb2   39   77.7817
  E2         40          82.4069        F2         41   87.3071      F#2/Gb2   42   92.4986
  G2         43          97.9989        G#2/Ab2   44   103.826      A2         45   110.000
  A#2/Bb2   46          116.541        B2         47   123.471      C3         48   130.813
  C#3/Db3   49          138.591        D3         50   146.832      D#3/Eb3   51   155.563
  E3         52          164.814        F3         53   174.614      F#3/Gb3   54   184.997
  G3         55          195.998        G#3/Ab3   56   207.652      A3         57   220.000
  A#3/Bb3   58          233.082        B3         59   246.942      C4         60   261.626
  C#4/Db4   61          277.183        D4         62   293.665      D#4/Eb4   63   311.127
  E4         64          329.628        F4         65   349.228      F#4/Gb4   66   369.994
  G4         67          391.995        G#4/Ab4   68   415.305      A4         69   440.000
  A#4/Bb4   70          466.164        B4         71   493.883      C5         72   523.251
  C#5/Db5   73          554.365        D5         74   587.330      D#5/Eb5   75   622.254
  E5         76          659.255        F5         77   698.456      F#5/Gb5   78   739.989
  G5         79          783.991        G#5/Ab5   80   830.609      A5         81   880.000
  A#5/Bb5   82          932.328        B5         83   987.767      C6         84   1046.50
  C#6/Db6   85          1108.73        D6         86   1174.66      D#6/Eb6   87   1244.51
  E6         88          1318.51        F6         89   1396.91      F#6/Gb6   90   1479.98
  G6         91          1567.98        G#6/Ab6   92   1661.22      A6         93   1760.00
  A#6/Bb6   94          1864.66        B6         95   1975.53                      

## Contents

# Note API

The Note API provides functionality to convert music notes into their
respective MIDI code and/or their frequency in Hertz, among other
things. It it used in combination with computer.beep and note blocks
(using OpenComponents).

- `note.midi(n: number or string): number`

      Converts a note in string form (e.g. A#4 or Gb3, see below) or a
      given frequency into the respective MIDI code

- `note.freq(n: number or string): number`

      Converts a note in string form (e.g. A#4) or a given MIDI code into
      the respective frequency

- `note.name(n: number): string`

      Converts a MIDI value back into a string; if you have a frequency to
      convert, just use `note.name(note.midi(frequency))`

- `note.ticks(n: number): number`

      Converts note block ticks (0-24) into MIDI code (34-58,
      respectively) and vice-versa. Useful for use with Note Blocks and
      OpenComponents

- `note.play(tone: string or number,duration: number)`

      Plays a note from a string or MIDI code via computer.beep with the
      specified duration

###Available notes The available string names, their respective MIDI
code and their frequency are shown here:

  Name       MIDI code   Frequency      A0         21   27.5000                      
  ---------- ----------- ----------- -- ---------- ---- --------- -- ---------- ---- ---------
  A#0/Bb0   22          29.1352        B0         23   30.8677      C1         24   32.7032
  C#1/Db1   25          34.6478        D1         26   36.7081      D#1/Eb1   27   38.8909
  E1         28          41.2034        F1         29   43.6535      F#1/Gb1   30   46.2493
  G1         31          48.9994        G#1/Ab1   32   51.9131      A1         33   55.0000
  A#1/Bb1   34          58.2705        B1         35   61.7354      C2         36   65.4064
  C#2/Db2   37          69.2957        D2         38   73.4162      D#2/Eb2   39   77.7817
  E2         40          82.4069        F2         41   87.3071      F#2/Gb2   42   92.4986
  G2         43          97.9989        G#2/Ab2   44   103.826      A2         45   110.000
  A#2/Bb2   46          116.541        B2         47   123.471      C3         48   130.813
  C#3/Db3   49          138.591        D3         50   146.832      D#3/Eb3   51   155.563
  E3         52          164.814        F3         53   174.614      F#3/Gb3   54   184.997
  G3         55          195.998        G#3/Ab3   56   207.652      A3         57   220.000
  A#3/Bb3   58          233.082        B3         59   246.942      C4         60   261.626
  C#4/Db4   61          277.183        D4         62   293.665      D#4/Eb4   63   311.127
  E4         64          329.628        F4         65   349.228      F#4/Gb4   66   369.994
  G4         67          391.995        G#4/Ab4   68   415.305      A4         69   440.000
  A#4/Bb4   70          466.164        B4         71   493.883      C5         72   523.251
  C#5/Db5   73          554.365        D5         74   587.330      D#5/Eb5   75   622.254
  E5         76          659.255        F5         77   698.456      F#5/Gb5   78   739.989
  G5         79          783.991        G#5/Ab5   80   830.609      A5         81   880.000
  A#5/Bb5   82          932.328        B5         83   987.767      C6         84   1046.50
  C#6/Db6   85          1108.73        D6         86   1174.66      D#6/Eb6   87   1244.51
  E6         88          1318.51        F6         89   1396.91      F#6/Gb6   90   1479.98
  G6         91          1567.98        G#6/Ab6   92   1661.22      A6         93   1760.00
  A#6/Bb6   94          1864.66        B6         95   1975.53                      

## Contents
