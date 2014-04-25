#! /usr/bin/env python
#-*- coding:utf-8 -*-
#
#绩点计算器-山东大学
#Author liuyc
#Date 20140126
#License GNU GPL v3 or later
#
# TODO: 已修课程页面
# Thanks: luxiao200888 http://userscripts.org/scripts/show/172789
#
import urllib
import urllib2
import cookielib
import string
import re
class SDUgrade:
    def __init__(self):
        hst = 'http://jwxt.sdu.edu.cn:7890/'
        self.login_url = hst+'pls/wwwbks/bks_login2.login'
        self.grade_url = hst+'pls/wwwbks/bkscjcx.curscopre'
        self.logout_url= hst+'pls/wwwbks/bks_login2.Logout'
        self.cookie = cookielib.CookieJar()
        self.getusr()
        self.postdata=urllib.urlencode({'stuid':self.stuid, 'pwd':self.pwd})
        self.opener = urllib2.build_opener(urllib2.HTTPCookieProcessor(self.cookie))
    def load(self):
        #f=open('t.html')
        #u=f.read().decode('gbk')
        #f.close()
        req = urllib2.Request(url = self.login_url,data = self.postdata)
        self.opener.open(req)
        u=self.opener.open(self.grade_url).read().decode('gbk')
        self.opener.open(self.logout_url)
        r=re.compile('<TR>.*?<p.*?<p.*?>(.*?)</p>.*?<p.*?>(.*?)</p>.*?<p.*?>(.*?)</p>.*?<p.*?>(.*?)</p>.*?<p.*?>(.*?)</p>.*?<p.*?>(.*?)</p>.*?<p.*?>(.*?)</p>.*?</TR>',re.S)
        self.lst=r.findall(u)
        self.lst=list(self.lst)
        i=0
        for n in self.lst:
            self.lst[i]=list(n)
            i+=1
    def tograde(self,grade):
        if(grade==u'优秀'): grade=95
        elif(grade==u'良好'): grade=85
        elif(grade==u'中等'): grade=75
        elif(grade==u'合格'): grade=65
        elif(grade==u'不合格' or grade==u' '): grade=0
        else: grade=int(grade)
        return grade
    def parse(self):
        self.pre_grade=[]
        self.anl_grade=[]
        self.anl_grade_rx=[]
        self.flag=0
        self.sum_xf=0
        self.s=0
        self.ave=0
        self.count=0
        self.anl_count=0
        self.average=0
        self.result=u'请预估'
        i=0
        for n in self.lst:
            kehao=n[0]
            name=n[1]
            xuhao=n[2]
            xuefen=n[3]
            shijian=n[4]
            grade=n[5]
            shuxing=n[6]
            if(xuefen==u''): xuefen=0
            else: xuefen=int(xuefen)
            if(xuhao==u''): xuhao=0
            else: xuhao=int(xuhao)
            if(grade==u' '):
                self.flag=1
                self.pre_grade.append(i)
            else:
                if(0<xuhao<900):
                    grade=self.tograde(grade)
                    self.ave+=grade
                    self.count+=1
                    self.anl_grade.append(grade)
                    self.sum_xf+=+xuefen
                    if(grade>=60): self.s+=grade*xuefen
            i+=1
    def calc(self):
        self.anl_count=len(self.anl_grade)
        self.average=float(self.ave)/self.count
        if(self.flag==0): self.result=('%.2f' % (float(self.s)/self.sum_xf))
        self.average=('%.2f' % self.average)
    def anl_pace(self):
        self.grade_pace=[0,0,0,0,0]
        i=0
        for n in self.anl_grade:
            if(self.anl_grade[i]>89): self.grade_pace[0]+=1
            elif(79<self.anl_grade[i]<90): self.grade_pace[1]+=1
            elif(69<self.anl_grade[i]<80): self.grade_pace[2]+=1
            elif(59<self.anl_grade[i]<70): self.grade_pace[3]+=1
            else: self.grade_pace[4]+=1
            i+=1
    def predict(self):
        for n in self.pre_grade:
            while True:
                print self.lst[n][1]
                i=raw_input()
                if(i!=''):
                    self.lst[n][5]=i
                    break
    def show(self):
        for i in self.lst:
            for j in i:
                print(j+'|'),
            print('')
    def getusr(self):
        t=('stuid','pwd')
        for n in t:
            while True:
                i=raw_input(n)
                if(i!=''):
                    exec('self.'+n+'=i')
                    break
#
#Simple Demo:
##from sdugrade import SDUgrade
##g=SDUgrade()
##g.load()
##g.show()
##g.parse()
##g.calc()
##g.anl_pace()
##for n in g.anl_grade: print(str(n)+'|'),
##print('')
##print('')
##print(u'平均分:'+g.average+u' 绩点:'+g.result)
##for n in g.grade_pace: print(str(n)+'|'),
##print('')
##if(g.flag==1):
##    print(u'成绩预估')
##    g.predict()
##    g.parse()
##    g.calc()
##    g.anl_pace()
##    for n in g.grade_pace: print(str(n)+'|'),
##    print('')
##    print(u'预估平均分:'+g.average+u' 绩点:'+g.result)
