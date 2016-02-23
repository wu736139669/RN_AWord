//
//  UIViewController+Category.m
//  testdemo
//
//  Created by xmfish on 16/2/19.
//  Copyright © 2016年 Facebook. All rights reserved.
//

#import "UIViewController+Category.h"
#import "objc/runtime.h"
static char rnDelegateURLKey;
@implementation UIViewController (Category)

- (void)setRnDelegate:(id)rnDelegate
{
  objc_setAssociatedObject(self,&rnDelegateURLKey, rnDelegate, OBJC_ASSOCIATION_RETAIN_NONATOMIC);
}
- (id)rnDelegate
{
  return objc_getAssociatedObject(self, &rnDelegateURLKey);
}
-(BOOL)canBecomeFirstResponder
{
  return YES;
}
- (BOOL)canPerformAction:(SEL)action withSender:(id)sender {
  if (action == @selector(meunClick:) ){
    return YES;
  }
  return NO;
}
-(void)meunClick:(id)sender
{
  if (self.rnDelegate && [self.rnDelegate respondsToSelector:@selector(meunClick:)]) {
    [self.rnDelegate meunClick:sender];
  }
}
@end
