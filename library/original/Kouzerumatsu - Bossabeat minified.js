// bossabeat; minification: Kouzerumatsukite (6 aug 2023)
sd =
"NNNNNNNNNN  BB  BB  SSSSOOOONNNNNNN NNNNNNN NN  BBBBBBB NNNNNN  OOOOOOOOOO  CC  CC  OOOOLLLLJJJJJJJ JJJJJJJ JJ  7777777 JJJJJJ  "+
"NNNNNNNNNN  BB  BB  SSSSOOOONNNNNNN NNNNNNN NN  BBBBBBB NNNNNN  OOOOOOOOOO  CC  CC  OOOOLLLLJJJJJJJ JJJJJJJ JJ  7777777 JJJJJJ  "+
"NNNNNNNNNN  BB  BB  SSSSOOOONNNNNNN NNNNNNN NN  BBBBBBB NNNNNN  OOOOOOOOOO  CC  CC  OOOOLLLLJJJJJJJ JJJJJJJ JJ  7777777 JJJJJJ  "+
"QQQQQQQQQQ  EE  EE  QQQQOOOONNNNNNN NNNNNNN NN  BBBBBBB NNNNNN  SSSSSSSSSS  GG  GG  XXXXSSSSSSSSSSS SSSSSSS SS  GGGGGGG SSSSSS  ",
td = 
"            JJ  ECCCEE  GGGGEEEEEEEECC      GEEEEEEEKK  HHHHGG  GEEEEEEE    GEEE    HGGGHH  IHHHHHHHGGGG    KJJJJJJJLNP         "+
"            JJ  ECCCEE  GGGGEEEEEEEECC      GEEEEEEEEE  DCCCBB  A9999999    A99999  CCCC99  65555555444455  877777779BD         "+
"            JJ  ECCCEE  GGGGEEEEEEEECC      GEEEEEEEKK  HHHHGG  GEEEEEEE    GEEE    HGGGHH  IHHHHHHHGGGG    KJJJJJJJHHHHGG  DCCC"+
"CCCCBBBBCC  FEEEEEEEGIK                             GGGGHH  HGGGGGGGGGGGGGGGGGGGGGGGIKMO                                        ",
pd = 
"CGJNCGJNCGJNCGJNCGJNCGJNCGJNEGKNEGKNEGKNEGKNEGKNEGKNEGKNEGKNEGKNEHLOEHLOEHLOEHLOEHLOEHLOEHLOGJLOGJLOGJLOGJLOGJLOGJLOGJLOGJLOGJLO"+
"CGJNCGJNCGJNCGJNCGJNCGJNCGJNEGKNEGKNEGKNEGKNEGKNEGKNEGKNEGKNEGKNEHLOEHLOEHLOEHLOEHLOEHLOEHLOFJLOFJLOFJLOFJLOFJLOFJLOFJLOFJLOFJLO"+
"CGJNCGJNCGJNCGJNCGJNCGJNCGJNEGKNEGKNEGKNEGKNEGKNEGKNEGKNEGKNEGKNEHLOEHLOEHLOEHLOEHLOEHLOEHLOGJLOGJLOGJLOGJLOGJLOGJLOGJLOGJLOGJLO"+
"CEJNCEJNCEJNCEJNCEJNCEJNCEJNDGKNDGKNDGKNDGKNDGKNDGKNDGKNDGKNDGKNEHLOEHLOEHLOEHLOEHLOEHLOEHLOGHLOGHLOGHLOGHLOGHLOGHLOGHLOGHLOGHLO",
qd = 
"      CGJ      CGJ         EGK      EGK   EGK         EHL      EHL         GLO      GLO   GLO   "+
"      CGJ      CGJ         EGK      EGK   EGK         EHL      EHL         FLO      FLO   FLO   "+
"      CGJ      CGJ         EGK      EGK   EGK         EHL      EHL         GLO      GLO   GLO   "+
"      CGJ      CGJ         DGK      DGK   DGK         EHL      EHL         CHL      CHL   CHL   ",
p=_=>35-parseInt(_,36),f=_=>2**((_-2)/12)*440,sr=44100,F=floor,
tri=_=>(_^-(_>>8&1))&255,saw=_=>_&511,swb=_=>_&2047,squ=_=>_&256,noi=_=>(sin(_**4)*255)&255,
1.5*(tri(t*f(p(td[F(t/sr*20) %512-0]))/256)/8+
tri(t*f(p(td[F(t/sr*20) %512-8]))/256)/16+
swb(t*f(p(sd[F(t/sr*20) %512-0]))/256)/64+
squ(t*f(p(qd[F(t/sr*5)*3%384+0]))/256)/32+
squ(t*f(p(qd[F(t/sr*5)*3%384+1]))/256)/32+
squ(t*f(p(qd[F(t/sr*5)*3%384+2]))/256)/32+
saw(t*f(p(pd[F(t/sr*5)*4%512+0]))/256)/48+
saw(t*f(p(pd[F(t/sr*5)*4%512+1]))/256)/48+
saw(t*f(p(pd[F(t/sr*5)*4%512+2]))/256)/48+
saw(t*f(p(pd[F(t/sr*5)*4%512+3]))/256)/48+
noi((F(t/sr*80)%16==0)*int(t*1))/8+
noi((F(t/sr*10)%16==4)*int(t*0.35))/6*(1-(t/sr*10)%1)+
noi((F(t/sr*10)%16==10)*int(t*0.35))/6*(1-(t/sr*10)%1)+
noi((F(t/sr*20)%32==28)*int(t*0.45))/6*(1-(t/sr*10)%1)+
noi((F(t/sr*40)%256==252)*int(t*0.35))/8+
noi((F(t/sr*40)%512==496)*int(t*0.35))/8)