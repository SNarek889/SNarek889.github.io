# Movie Recommendation System / Ֆիլմերի առաջարկման համակարգ

## Description / Նկարագրություն

This repository contains a K-Nearest Neighbors (KNN) based movie recommendation system implemented in Python. The system analyzes user profiles based on their tagging behavior and recommends movies from similar users.

Այս պահոցը պարունակում է K-մոտակա հարևանների (KNN) վրա հիմնված ֆիլմերի առաջարկման համակարգ, որը իրականացված է Python-ով: Համակարգը վերլուծում է օգտատերերի պրոֆիլները՝ հիմնվելով նրանց թեգավորման վարքագծի վրա և առաջարկում է ֆիլմեր նմանատիպ օգտատերերից:

## Features / Հատկություններ

The recommendation system creates user profiles based on three key features:
1. **Tag Count** (Ակտիվություն) - User activity level
2. **Average Year** (Տարեթվի նախասիրություն) - Movie year preference
3. **Specific Tag Interest** (Կոնկրետ թեգի հաճախականություն) - Interest in specific tags

Առաջարկման համակարգը ստեղծում է օգտատերերի պրոֆիլներ՝ հիմնվելով երեք հիմնական հատկանիշների վրա:

## Files / Ֆայլեր

- `movie_recommendation.py` - Main recommendation system implementation
- `movie.csv` - Movie database with titles and genres
- `tag.csv` - User tagging data

## Usage / Օգտագործում

```python
# Run the script
python movie_recommendation.py

# Or use the function directly
from movie_recommendation import get_recommendations_with_tags

recommendations = get_recommendations_with_tags(
    target_user_id=65,
    chosen_tag='hero',
    k=5
)
print(recommendations)
```

## Requirements / Պահանջներ

- Python 3.x
- pandas>=2.0.0
- numpy>=1.24.0

Install dependencies:
```bash
pip install -r requirements.txt
```

## How it works / Ինչպես է աշխատում

1. **Feature Creation**: Creates user profiles with normalized features
2. **Normalization**: Applies Min-Max scaling to features
3. **KNN Algorithm**: Uses Euclidean distance to find k-nearest neighbors
4. **Recommendation**: Returns movies tagged by similar users

1. **Հատկանիշների ստեղծում**: Ստեղծում է օգտատերերի պրոֆիլներ նորմալացված հատկանիշներով
2. **Նորմալացում**: Կիրառում է Min-Max մասշտաբավորում
3. **KNN ալգորիթմ**: Օգտագործում է Էվկլիդյան հեռավորություն k-մոտակա հարևանների գտնելու համար
4. **Առաջարկ**: Վերադարձնում է նմանատիպ օգտատերերի թեգավորած ֆիլմերը
