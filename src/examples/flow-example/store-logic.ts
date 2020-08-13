/* istanbul ignore file */
import { deed } from 'gin';

export const cargo = {
  a: 0,
  b: 0,
  c: 0,
};

const delay = () => new Promise(resolve => setTimeout(resolve, 400));

const incrementA = deed.action.called('incrementA').thatDoes(async (xt, value) => {
  await delay();
  return { a: xt.cargo.a + value };
});
const incrementB = deed.action.called('incrementB').thatDoes(async (xt, value) => {
  await delay();
  return { b: xt.cargo.b + value };
});
const incrementC = deed.action.called('incrementC').thatDoes(async (xt, value) => {
  await delay();
  return { c: xt.cargo.c + value };
});

const incrementAllAtOnce = deed.flow
  .called('incrementAllAtOnce')
  .thatStartsWith([incrementA, incrementB, incrementC]);

const incrementInOrder = deed.flow
  .called('incrementInOrder')
  .thatStartsWith(incrementA)
  .whichAdvancesOn('shipment')
  .andThenCalls(incrementB)
  .whichAdvancesOn('shipment')
  .withOriginalArgs()
  .andThenCalls(incrementC)
  .withOriginalArgs();

const incrementPassThrough = deed.flow
  .called('incrementPassThrough')
  .thatStartsWith(incrementA)
  .whichMapsTo(resultFromA => 2 * resultFromA.a)
  .andThenCalls(incrementB)
  .whichMapsTo(resultFromB => 2 * resultFromB.b)
  .andThenCalls(incrementC);

export const deeds = [incrementAllAtOnce, incrementInOrder, incrementPassThrough];
