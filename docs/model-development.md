# Model Development

Developing a model that can identify nutrient-deficiency symptoms from plant images is a central goal of **Intelligent Nutrient Management for Aeroponics**. Model development has **not yet begun**; we have no trained model or evaluation results to report. The in-progress time-series dataset is intended to provide the labelled images needed for this work.

## Intended model task

We aim to analyze fenugreek images and identify visual responses associated with the fertilizer conditions in our experiment. The treatment labels describe combinations that include or omit calcium nitrate, potassium sulphate, and ammonium phosphate; they are not isolated elemental N, P, or K deficiency labels.

## Candidate approaches

Potential approaches include traditional computer vision, ResNet, EfficientNet, MobileNet, and hybrid models. These are candidates for investigation, not implemented or evaluated models.

## Evaluation to document

When development begins, document the dataset version, treatment labels, plant-level train/validation/test split, model configuration, evaluation measures, and limitations. Keep designated test plants separate from training and tuning so evaluation measures generalization to unseen plants.
