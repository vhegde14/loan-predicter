import pandas as pd
from sklearn.preprocessing import LabelEncoder
import statsmodels.api as sm

def format(df):
    y = df['not.fully.paid']
    X = df.drop('not.fully.paid', axis=1)

    # label encoder for categorical category - purpose of loan
    purpose_encoder = LabelEncoder()
    X['purpose'] = purpose_encoder.fit_transform(X['purpose'])
    
    return X, y

def feature_selection(X, y):
    # adding a row of constant ones
    X_1 = sm.add_constant(X)

    # fitting an Ordinary Least Squares model
    model = sm.OLS(y, X_1).fit()
    model.pvalues

    # backward elimination
    columns, removed_cols, p_max = list(X.columns), [], 1
    while len(columns) > 0:
        X_1 = X[columns]
        X_1 = sm.add_constant(X_1)
        model = sm.OLS(y, X_1).fit()
        p = pd.Series(model.pvalues.values[1:], index = columns)
        p_max = max(p)
        if p_max < 0.05:
            break
        print(p.idxmax())
        removed_cols.append(p.idxmax())
        columns.remove(p.idxmax())
        
    return columns