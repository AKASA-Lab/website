# Fertilizer Treatments

Our experiment varies the presence or absence of three fertilizer compounds in the nutrient solution, producing eight treatment combinations.

| Factor | Fertilizer compound |
| --- | --- |
| A | Calcium nitrate |
| B | Potassium sulphate |
| C | Ammonium phosphate |

Each digit in the treatment code represents the corresponding fertilizer factor: `1` means the compound is included and `0` means it is omitted.

| Treatment code | Calcium nitrate (A) | Potassium sulphate (B) | Ammonium phosphate (C) |
| --- | ---: | ---: | ---: |
| `000` | Omitted | Omitted | Omitted |
| `001` | Omitted | Omitted | Included |
| `010` | Omitted | Included | Omitted |
| `011` | Omitted | Included | Included |
| `100` | Included | Omitted | Omitted |
| `101` | Included | Omitted | Included |
| `110` | Included | Included | Omitted |
| `111` | Included | Included | Included |

## How to interpret the treatments

Our treatments compare fertilizer-compound combinations in the nutrient solution. We do not isolate individual nitrogen (N), phosphorus (P), or potassium (K) elements. A treatment code identifies whether each fertilizer compound is present; it does not specify its dose.

Record the concentration or dose of each included compound, solution batch, plant and bucket identifiers, and any changes for each run. Keep the same code in plant labels, solution records, image filenames, and dataset metadata.
