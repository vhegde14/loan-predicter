import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
import joblib
import preprocessing

# load dataframe
df = pd.read_csv('loan_data.csv')

X, y = preprocessing.format(df)

selected_features = preprocessing.feature_selection(X, y)

X = X[selected_features]
# randomly splitting the data into training and testing
# X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=14)

# create and fit the logistic regression model
log_reg = LogisticRegression(class_weight='balanced', random_state=14)
log_reg.fit(X, y)
# y_pred = log_reg.predict(X_test)


joblib.dump(log_reg, 'model.pkl')
print("Model Dumped")

lr = joblib.load('model.pkl')

model_columns = list(X.columns)
joblib.dump(model_columns, 'model_columns.pkl')
print("Models columns dumped")