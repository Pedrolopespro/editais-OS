# Transcrição do Apêndice IV do TR (p. 42) — Pregão Eletrônico 319/2026
# Por categoria: código, nome,
#  faixa1: (qtd diária24, preço), (qtd HE24, preço), (qtd diária10, preço), (qtd HE10, preço)
#  faixa2/3/4: (qtd diária24, preço diária24, preço HE)   — HE com quantidade 1 (fórmula SBn = FP×diária + HE)
CATS = [
 ("A","Executivo Blindado II",          (168,2400),(87,300),(137,1920),(39,300),  (1,1920,299),(1,1440,298),(1,1200,240),  709437.00),
 ("B","Camioneta I Blindada 4x4 (SUV I)",(265,3200),(150,350),(100,2560),(27,350), (1,2560,349),(2,1920,348),(2,1600,320),  1176567.00),
 ("C","Camioneta I Blindada 4x2 (SUV I)",(384,3200),(111,330),(186,2560),(46,330), (1,2560,329),(3,1920,328),(3,1600,320),  1770867.00),
 ("D","Camioneta II Blindada (SUV II)",  (169,2980),(88,310),(138,2384),(40,310),  (1,2384,309),(1,1788,308),(1,1490,298),  878869.00),
 ("E","Camioneta I 4x4 (SUV I)",         (10,2300),(6,230),(9,1840),(2,230),       (1,2048,229),(2,1536,228),(2,1280,227),  49764.00),
 ("F","Camioneta I 4x2 (SUV I)",         (153,1900),(41,190),(84,1520),(17,190),   (1,1890,189),(2,1488,188),(1,1240,187),  436070.00),
 ("G","Camioneta II (SUV II)",           (100,1500),(44,150),(22,1200),(1,150),    (1,1490,149),(1,1392,148),(1,1160,147),  187636.00),
 ("H","Camioneta III (SUV III)",         (383,1400),(225,140),(248,1120),(55,140), (1,1390,139),(1,1188,138),(1,990,137),   857142.00),
 ("I","Caminhonete 4x4",                 (115,1800),(54,180),(38,1440),(4,180),    (1,1790,179),(2,1476,178),(2,1230,177),  279896.00),
 ("J","Caminhonete 4x2",                 (100,1500),(43,150),(22,1200),(1,150),    (1,1452,149),(1,1452,148),(1,1210,147),  187558.00),
 ("K","Executivo II",                    (382,1000),(225,100),(248,800),(55,100),  (1,960,99),(1,864,98),(1,777.60,97),     611295.60),
 ("L","Sedan",                           (2801,680),(412,68),(2014,544),(221,68),  (1,670,67),(2,528,66),(2,440,36),        3046115.00),
 ("M","Van teto baixo",                  (23,1100),(7,110),(20,880),(1,110),       (1,1090,109),(1,1080,108),(1,1070,107),  47344.00),
 ("N","Van Executiva",                   (1128,1500),(356,150),(974,1200),(78,150),(1,1490,149),(1,1480,148),(1,1240,147),  2930554.00),
 ("O","Van Furgão",                      (37,1500),(12,150),(32,1200),(4,150),     (1,1490,149),(1,1440,148),(1,1200,147),  100874.00),
 ("P","Utilitário Furgão",               (50,850),(88,85),(39,680),(23,85),        (1,840,84),(1,830,83),(1,820,82),        81194.00),
 ("Q","Ônibus Rodoviário",               (24,3500),(82,350),(75,2800),(33,350),    (1,3490,349),(1,3480,348),(1,3369.60,347),345633.60),
 ("R","Ônibus Urbano",                   (25,3200),(82,320),(75,2560),(33,320),    (1,3190,319),(1,2640,318),(1,2200,317),  317784.00),
 ("S","Micro-ônibus",                    (8,2800),(50,280),(31,2240),(10,280),     (1,2790,279),(1,2580,278),(1,2150,277),  116994.00),
 ("T","Microcaminhão",                   (50,1500),(137,150),(173,1200),(12,150),  (1,1490,149),(2,1480,148),(1,1470,147),  311314.00),
 ("U","Guincho",                         (1,1300),(1,130),(2,1040),(2,130),        (1,1290,129),(1,1280,128),(1,1270,127),  7994.00),
 ("V","Veículo para transporte de cadeirante",(1,1000),(1,100),(1,800),(1,100),    (1,990,99),(1,980,98),(1,970,97),        5234.00),
]
NOSHOW = {"A":(1,1344),"B":(7,1792),"C":(1,1792),"D":(1,1680.80),"E":(1,1433.60),"F":(7,1330),"G":(1,1050),"H":(1,980),
 "I":(1,1260),"J":(1,1050),"K":(1,700),"L":(30,476),"M":(1,770),"N":(14,1050),"O":(1,1050),"P":(4,595),"Q":(1,2450),
 "R":(1,2240),"S":(1,1960),"T":(1,1050),"U":(1,910),"V":(1,700)}
MAO = [("Motorista","diária",7501,380.00),("Motorista com adicional de 60%","diária",2658,608.00),("Hora extra de motorista","hora",5344,60.80),
       ("Agente de missão","diária",300,1380.00),("Agente de missão com adicional de 60%","diária",178,2208.00)]
COMB = [("Etanol",43078,3.88),("Diesel S10",48008,6.91),("Gasolina",22739,6.41)]
TOTAIS = {"loc":14456136.20,"ns":75634.40,"mot":4791359.20,"age":807024.00,"comb":705552.91,"total":20835706.71}

FAIXAS = ["Até 6 dias","7 a 14 dias","15 a 29 dias","30 dias ou mais"]

def rows_locacao():
    """Uma linha por preço a cotar."""
    out=[]
    for c in CATS:
        cod,nome,d24,he24,d10,he10,f2,f3,f4,_ = c
        out.append((cod,nome,FAIXAS[0],"Diária 24 h",d24[0],d24[1]))
        out.append((cod,nome,FAIXAS[0],"Hora extra 24 h",he24[0],he24[1]))
        out.append((cod,nome,FAIXAS[0],"Diária 10 h",d10[0],d10[1]))
        out.append((cod,nome,FAIXAS[0],"Hora extra 10 h",he10[0],he10[1]))
        for fx,(q,d,h) in zip(FAIXAS[1:],(f2,f3,f4)):
            out.append((cod,nome,fx,"Diária 24 h",q,d))
            out.append((cod,nome,fx,"Hora extra 24 h",1,h))
    return out

if __name__=="__main__":
    r=rows_locacao(); loc=round(sum(q*p for *_,q,p in r),2)
    percat={}
    for cod,_,_,_,q,p in r: percat[cod]=percat.get(cod,0)+q*p
    bad=[c[0] for c in CATS if abs(percat[c[0]]-c[9])>0.005]
    ns=round(sum(q*p for q,p in NOSHOW.values()),2)
    mao=round(sum(q*p for *_,q,p in MAO),2)
    comb=round(sum(round(l*p*1.0945,2) for _,l,p in COMB),2)
    print("locação",loc,"cats divergentes",bad)
    print("no show",ns,"mão de obra",mao,"combustível",comb)
    print("total",round(loc+ns+mao+comb,2))
    # regras
    over=[]
    for c in CATS:
        cod=c[0]; d10=c[4][1]; teto=round(d10*0.7,2); v=NOSHOW[cod][1]
        if v>teto+0.005: over.append((cod,v,teto,round(v-teto,2),NOSHOW[cod][0]))
    print("no show acima do teto:",len(over),"de",len(CATS))
    print("excesso total no ano:",round(sum(x[3]*x[4] for x in over),2))
    r80=[c[0] for c in CATS if c[4][1]>0.8*c[2][1]+0.005]
    r20=[(c[0],k) for c in CATS for k,(he,base) in {"he24":(c[3][1],c[2][1]),"he10":(c[5][1],c[4][1])}.items() if he>0.2*base+0.005]
    print("10h > 80%:",r80,"HE > 20%:",r20)
