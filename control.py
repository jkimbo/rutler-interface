#!/usr/bin/python

import sys
import shlex
import subprocess as sp

class NodeProcess(object):
    def __init__(self, stdin=sp.PIPE, stdout=sp.PIPE, stderr=sp.PIPE, 
                 name='node'):
        self.stdin = stdin
        self.stdout = stdout
        self.stderr = stderr
        if isinstance(name, basestring):
            name = shlex.split(name)
        self.proc = sp.Popen(name, stdin=stdin, stdout=stdout, stderr=stderr)


if __name__ == '__main__':
    node = NodeProcess()
    #print node.proc.stdout.readline()
    node.proc.stdin.write('console.log("hello")')
    print node.proc.stdout.readline()
    node.proc.terminate()
