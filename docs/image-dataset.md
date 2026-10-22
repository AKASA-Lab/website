# Image Dataset

Dataset collection is in progress. We are organizing fenugreek images captured over time across eight combinations of calcium nitrate, potassium sulphate, and ammonium phosphate. We plan to keep designated test plants separate from training and tuning data for final model evaluation.

## Dataset status

The testbed photographs on this site show the equipment; they are not dataset samples. Image counts, capture schedule, camera settings, access terms, and release status are not yet documented here.

## Suggested record fields

Include only fields that can be verified and recorded consistently. Candidate metadata:

| Field | Purpose |
| --- | --- |
| Image identifier | Uniquely identify the image |
| `image_id` | Uniquely identify the image |
| `plant_id` | Relate images from the same plant |
| `bucket_id` | Identify the growing bucket |
| `treatment_code` | Record which fertilizer compounds are included (`1`) or omitted (`0`) |
| `capture_time` | Place the image in the time series |
| `growth_day` | Record the plant's time point in the experiment |
| `camera_setup` | Identify the camera position or setup |
| `notes` | Record visible stress, obstruction, or anomaly |

Keep dataset splits plant-based so images from the same plant do not appear in both training and evaluation sets. Record the final schema and any changes alongside each dataset release.
