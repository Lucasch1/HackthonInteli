import pandas as pd
import yfinance as yf
import matplotlib.pyplot as plt
import seaborn as sns

import statsmodels
import statsmodels.api as sm
from statsmodels.tsa.stattools import coint
import numpy as np


#Baixar dados
data = yf.download(['BTC-USD', 'ETH-USD'], '2022-06-01', '2023-01-01')
df = pd.DataFrame(data)
df = df['Adj Close']

#Criar estrategia de long&short com cointegracao utilizando a contintegracao dos ativos
df['Ratio(BTC/ETH)'] = df['BTC-USD']/df['ETH-USD']
df['Ratio(ETH/BTC)'] = df['ETH-USD']/df['BTC-USD']
df['BTC %'] = df['BTC-USD'].pct_change()
df['ETH %'] = df['ETH-USD'].pct_change()


btc = df[['BTC-USD']]
eth = df[['ETH-USD']]

score, pvalue, _ = coint(btc, eth, maxlag=1)
print(f'Teste p-valor da Cointegracao {str(pvalue)}')

spread_btc = sm.add_constant(btc)

results_reg = sm.OLS(eth, spread_btc).fit()

btc = btc['BTC-USD']
eth = eth['ETH-USD']

b = results_reg.params['BTC-USD']

spread = eth - b * btc


def zscore(series):
    return(series - series.mean())/ np.std(series)

zscore(spread).plot(figsize=(15,10))
plt.axhline(zscore(spread).mean(), color='black')
plt.axhline(1.0, color='red', linestyle='--')
plt.axhline(-1.0, color='green', linestyle='--')
plt.legend(['Spread z-score', 'Mean', '+1', '-1'])

plt.show()


sinais = pd.DataFrame()
sinais['BTC'] = btc
sinais['ETH'] = eth
ratios = sinais['BTC']/sinais['ETH']

sinais['z'] = zscore(ratios)
sinais['z_limite_superior'] = np.mean(sinais['z']) + np.std(sinais['z'])
sinais['z_limite_inferior'] = np.mean(sinais['z']) - np.std(sinais['z'])

sinais['sinais1'] = 0
sinais['sinais1'] = np.select([sinais['z'] > sinais['z_limite_superior'], sinais['z'] < sinais['z_limite_inferior']], [-1, 1], default=0)

sinais['positions1'] = sinais['sinais1'].diff()
sinais['sinais2'] = -sinais['sinais1']
sinais['positions2'] = sinais['sinais2'].diff()


capital = 10000000

positions1 = capital// max(sinais['BTC'])
positions2 = capital// max(sinais['ETH'])

portifolio = pd.DataFrame()
portifolio['BTC'] = sinais['BTC']
portifolio['holding_BTC'] =  sinais['positions1'].cumsum() * sinais['BTC'] * positions1
portifolio['cash_BTC'] = capital - (sinais['positions1'] * sinais['BTC'] * positions1).cumsum()
portifolio['total_BTC'] = portifolio['holding_BTC'] + portifolio['cash_BTC']
portifolio['return_BTC'] = portifolio['total_BTC'].pct_change()
portifolio['positions1'] = sinais['positions1']


portifolio['ETH'] = sinais['ETH']
portifolio['holding_ETH'] =  sinais['positions2'].cumsum() * sinais['ETH'] * positions2
portifolio['cash_ETH'] = capital - (sinais['positions2'] * sinais['ETH'] * positions2).cumsum()
portifolio['total_ETH'] = portifolio['holding_ETH'] + portifolio['cash_ETH']
portifolio['return_ETH'] = portifolio['total_ETH'].pct_change()
portifolio['positions2'] = sinais['positions2']

portifolio['Total'] = portifolio['total_BTC'] + portifolio['total_ETH']

portifolio = portifolio.dropna()

print(portifolio.head(50))


plt.clf()
plt.plot(portifolio['Total'])
plt.show()




#configurar dados
print(df.head())
plt.style.use('seaborn')
plt.plot(df['BTC %']) 
plt.plot(df['ETH %'])
#plt.yscale("log")
plt.show()




plt.hist(df['Ratio(BTC/ETH)'], bins=10)

plt.title('Distribuição da relação BTC/ETH')
plt.xlabel('Valor da relação BTC/ETH')
plt.ylabel('Frequência')

plt.show()

