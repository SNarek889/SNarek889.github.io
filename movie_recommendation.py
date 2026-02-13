import pandas as pd
import numpy as np

# 1. Բեռնում ենք ֆայլերը
movies = pd.read_csv('movie.csv')
tags = pd.read_csv('tag.csv')

# Նախապատրաստում. հանում ենք տարեթիվը ֆիլմի անունից
movies['year'] = movies['title'].str.extract(r'(\d{4})').astype(float).fillna(2000)

def get_recommendations_with_tags(target_user_id, chosen_tag, k=5):
    # --- ՔԱՅԼ 1: 3 ՀԱՏԿԱՆԻՇՆԵՐԻ ՍՏԵՂԾՈՒՄ (USER PROFILES) ---
    
    # Միացնում ենք թեգերը և ֆիլմերը
    user_data = tags.merge(movies[['movieId', 'year']], on='movieId')
    
    # Հաշվարկում ենք յուրաքանչյուր օգտատիրոջ համար
    user_profiles = user_data.groupby('userId').agg(
        tag_count=('tag', 'count'),          # Չափանիշ 1: Ակտիվություն
        avg_year=('year', 'mean')           # Չափանիշ 2: Տարեթվի նախասիրություն
    ).reset_index()

    # Չափանիշ 3: Կոնկրետ թեգի օգտագործման հաճախականություն
    tag_interest = user_data[user_data['tag'].str.contains(chosen_tag, case=False, na=False)]
    tag_count_per_user = tag_interest.groupby('userId').size().reset_index(name='specific_tag_interest')
    
    user_profiles = user_profiles.merge(tag_count_per_user, on='userId', how='left').fillna(0)

    # --- ՔԱՅԼ 2: ՆՈՐՄԱԼԱՑՈՒՄ (Min-Max Scaling) ---
    features = ['tag_count', 'avg_year', 'specific_tag_interest']
    df_scaled = user_profiles.copy()
    for col in features:
        min_v, max_v = df_scaled[col].min(), df_scaled[col].max()
        if max_v - min_v != 0:
            df_scaled[col] = (df_scaled[col] - min_v) / (max_v - min_v)
        else:
            df_scaled[col] = 0

    # --- ՔԱՅԼ 3: KNN (Էվկլիդյան հեռավորություն) ---
    user_matrix = df_scaled[features].values
    try:
        target_idx = user_profiles[user_profiles['userId'] == target_user_id].index[0]
    except IndexError:
        return "Օգտատերը չի գտնվել: / User not found."

    target_vector = user_matrix[target_idx]
    
    distances = []
    for i in range(len(user_matrix)):
        if i == target_idx: continue
        # Euclidean Distance: sqrt(sum((a-b)^2))
        dist = np.sqrt(np.sum((target_vector - user_matrix[i])**2))
        distances.append((user_profiles.iloc[i]['userId'], dist))

    # Գտնում ենք k ամենամոտ հարևաններին
    distances.sort(key=lambda x: x[1])
    closest_users = [u[0] for u in distances[:k]]

    # --- ՔԱՅԼ 4: ԱՐԴՅՈՒՆՔԻ ՍՏԱՑՈՒՄ ---
    # Տեսնենք, թե ինչ ֆիլմեր են թեգավորել նմանատիպ օգտատերերը
    recommended_movie_ids = tags[tags['userId'].isin(closest_users)]['movieId'].value_counts().head(5).index
    
    return movies[movies['movieId'].isin(recommended_movie_ids)][['title', 'genres']]

# Փորձարկում. Օգտատեր 65, ով հետաքրքրված է "hero" թեգով
print(get_recommendations_with_tags(target_user_id=65, chosen_tag='hero', k=5))
